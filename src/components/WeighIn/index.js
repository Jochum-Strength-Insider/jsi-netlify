import React, { useState, useEffect, useCallback } from 'react';

import { withFirebase } from '../Firebase';
import { get, orderByChild, query, limitToLast, push, startAt, endAt } from "firebase/database";

import "./style.css";

import Modal from '../Modal';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import MonthCircles from './MonthCircles';

import { Line } from 'react-chartjs-2';
import moment from 'moment';

const DATA_SET_OPTIONS = {
   label: 'Weight',
   fill: true,
   lineTension: 0.2,
   backgroundColor: 'rgb(255,255,255, 0.1)',
   borderColor: 'white',
   borderWidth: 2,
   pointBorderColor: 'white',
   pointBackgroundColor: '#a76884',
   pointBorderWidth: 1,
   pointHoverRadius: 5,
   pointHoverBorderWidth: 2,
   pointRadius: 5,
   pointHitRadius: 10,
}

const DATE_FORMAT = "YYYY-MM-DD";

const WeightBase = ({firebase, authUser}) => {

   const currentDate = moment();
   const date = currentDate.format(DATE_FORMAT);

   const initialData = {
      labels: [],
      datasets: [
         {
            ...DATA_SET_OPTIONS,
            data: [],
         }
      ],
   };

   // const [loading, setLoading] = useState(false);
   const [data, setData] = useState(JSON.parse(localStorage.getItem('chartData')) || initialData);
   const [listData, setListData] = useState([]);
   const [show, setShow] = useState(false);
   const [options, setOptions] = useState({});
   const [weight, setWeight] = useState(180);
   const [lastDate, setLastDate] = useState('');
   const [invalid, setInvalid] = useState(false);
   const [queryDate, setQueryDate] = useState(currentDate.format(DATE_FORMAT));
   const [error, setError] = useState(null);

   const formattedDate = currentDate.format(DATE_FORMAT);
   const day = currentDate.format('ddd');

   const startOfMonth = moment().startOf("M").format(DATE_FORMAT);
   const startOfQuery = moment(queryDate).startOf("M").format(DATE_FORMAT);

   const isCurrentMonth = startOfMonth === startOfQuery;

   const getOptions = (title, weightData) => {
      const gridColor = "rgba(255, 255, 255, 0.100)";
      const tickColor = "white";

      return {
         responsive: true,
         legend: {
            display: false,
         },
         title: {
            display: false,
            text: title,
            fontColor: "white",
         },
         animation: {
            animateScale: true
         },
         tooltips: {
            callbacks: {
               title: function (tooltipItem, data) {
                  const label = data.labels[tooltipItem[0].index];
                  const toDay = label.format("MMM D YYYY");
                  return toDay;
               },
               label: function (tooltipItem, data) {
                  const weight = tooltipItem.yLabel;
                  return weight + "lbs";
               },
            }
         },
         scales: {
            yAxes: [{
               ticks: {
                  // beginAtZero: true,
                  callback: function (value) { if (Number.isInteger(value)) { return `${value} `; } },
                  stepSize: 5,
                  suggestedMin: Math.min(...weightData) - 20,
                  suggestedMax: Math.max(...weightData) + 20,
                  fontColor: tickColor,
               },
               scaleLabel: {
                  display: false,
                  labelString: 'lbs'
               },
               gridLines: {
                  color: gridColor,
                  zeroLineColor: gridColor,
               },
            }],
            xAxes: [{
               // time settings
               type: 'time',
               time: {
                  unit: 'day',
                  unitStepSize: 1,
                  displayFormats: {
                     day: 'D'
                  }
               },
               scaleLabel: {
                  display: true,
                  labelString: 'Date',
                  fontColor: tickColor,
               },
               distribution: 'linear',
               ticks: {
                  fontColor: tickColor,
               },
               gridLines: {
                  color: gridColor,
                  zeroLineColor: gridColor,
               },
            }]
         }
      }
   }

   const addWeighIn = (weight) => (e) => {
      e.preventDefault();
      const timestamp = Number(moment(date).format("x"));
      const nowString = moment(date).format("MMM D");
      const lastDatestring = moment(lastDate).format("MMM D");
      console.log('add weigh in');

      if (lastDatestring !== nowString) {
         console.log("push: ", weight);
         const weighInKey = push(firebase.weighIn(authUser.uid), { date: timestamp, weight: weight }, (err) => {
            setError(err);
         }).key;
         if(weighInKey){
            console.log('callback?');
            hideAndValidateModal();
            fetchData(queryDate);
         }
      } else {
         setInvalid(true);
      }
   }

   const showModal = () => setShow(true);
   const hideModal = () => setShow(false);

   const hideAndValidateModal = () => {
      setShow(false);
      setInvalid(true);
   };

   const fetchData = useCallback((queryDate) => {
      
      const month = moment(queryDate).format("MMMM");
      const currentMonth = moment(currentDate).format("MMMM");
      const onMount = currentMonth === month;
      const startOf = Number(moment(queryDate).startOf("month").format("x"));
      const endOf = Number(moment(queryDate).endOf("month").format("x"));

      const weighInDataQueryRef = query(firebase.weighIn(authUser.uid), orderByChild('date', 'asc'), startAt(startOf), endAt(endOf));

      get(weighInDataQueryRef).then( snapshot => {
         const weighInObject = snapshot.val();

         if (weighInObject) {
            const dataArray = Object.keys(weighInObject).map(key => weighInObject[key]);

            const weightData = dataArray.map(item => item.weight);
            const dateLabels = dataArray.map((item) => moment(item.date).startOf("day"));

            const weightDataFullMonth = [null, ...weightData, null];
            const dateLabelsFullMonth = [startOf, ...dateLabels, endOf];

            const chartData = {
               labels: dateLabelsFullMonth,
               datasets: [
                  {
                     ...DATA_SET_OPTIONS,
                     data: weightDataFullMonth
                  }
               ],
            };
            
            if (onMount) {
               setWeight(weightData[weightData.length - 1]);
               localStorage.setItem('chartData', JSON.stringify(chartData));
            }
            setData(chartData);
            setListData(dataArray);
            setOptions(getOptions(month, weightData));

         } else {
            const chartData = {
               labels: [startOf, endOf],
               datasets: [
                  {
                     ...DATA_SET_OPTIONS,
                     data: [null, null]
                  }
               ],
            };
            
            if (onMount) {
               setWeight(180);
               localStorage.removeItem('chartData');
            }
            setData(chartData);
            setListData([]);
            setOptions(getOptions(month, [180]));
         }
      })

   }, [authUser.uid, firebase, currentDate])

   const changeQueryDate = (date) => () => {
      setQueryDate(date);
      fetchData(date);
   }

   useEffect(() => {
      const weighInQueryRef = query(firebase.weighIn(authUser.uid), orderByChild('date'), limitToLast(1));

      get(weighInQueryRef).then(snapshot => {
         const dateObject = snapshot.val();
         if (dateObject) {
            const lastDateObject = Object.keys(dateObject).map(date => dateObject[date])[0];
            const lastDate = lastDateObject.date;
            const now = moment().format(DATE_FORMAT);
            const dateFormatted = moment(lastDate).format(DATE_FORMAT);

            if (now === dateFormatted) {
               console.log("yep", now, dateFormatted);
               setInvalid(true);
            } else {
               console.log("nope", now, dateFormatted);
               setShow(true);
            }
            setLastDate(lastDate);
         } else {
            setShow(true);
         }
      });

      fetchData(queryDate);

      // const quickAdd = () => {
      //    const dates = [];
      //    for( let i = 0; i < 5; i++ ) {
      //       for( let j = 1; j< 6; j++){
      //          const updateMonth = moment().subtract(i, 'months');
      //          const updateDate = updateMonth.subtract(j, 'days');
      //          const update = {date: Number(updateDate.format("x")), weight: 180 + Math.floor(Math.random() * 10)};
      //          dates.push(update);
      //       }
      //    }
      //    console.log("dates", dates);
      //    dates.map(weighIn => push(firebase.weighIn(authUser.uid), weighIn));
      // }

      // return () => firebase.weighIn(authUser.uid).off();
   // eslint-disable-next-line
   }, []);

   return (
      <>
         <CheckInModal show={show} hideModal={hideModal} addWeighIn={addWeighIn} day={day} formattedDate={formattedDate} startWeight={weight} invalid={invalid} />

         {error && <Alert variant="warning">{error.message}</Alert>}

         <WeighInChart date={queryDate} data={data} options={options}/>

         <ListGroup>
            <ListGroup.Item>
               <MonthCircles queryDate={queryDate} changeQueryDate={changeQueryDate} />
            </ListGroup.Item>

            <WeightList listData={listData}/>

            {isCurrentMonth && (
               <ListGroup.Item className="d-flex justify-content-center">
                  <button className="py-2 weigh-button btn btn-primary" variant="primary" onClick={showModal}>+ Weigh In</button>
               </ListGroup.Item>
            )}

         </ListGroup>
      </>
   )
}

const WeighInChart = ({date, data, options}) => {
   const chartTitle = moment(date).format('MMMM YYYY');

   return (
      <div className="canvas-container mb-3">
      <h3 className="text-center">{chartTitle}</h3>
      <Line
         data={data}
         options={options}
      />
   </div>
   )
}

const CheckInModal = ({show, hideModal, addWeighIn, day, formattedDate, startWeight, invalid}) => {
   const [weightValue, setWeight] = useState(startWeight);

   return (
      <Modal show={show} handleClose={hideModal} heading={"Add Weigh In?"}>
      <Form onSubmit={addWeighIn(weightValue)}>
         <Form.Group>
            <Form.Label>{day} {formattedDate}</Form.Label>
            <Form.Control
               type="number"
               name="weight"
               onChange={(e) => setWeight(e.target.value)}
               value={weightValue}
               required
               isInvalid={invalid}
               min="0"
               max="1000"
            />
            <Form.Control.Feedback type="invalid">
               Already Checked In Today.
            </Form.Control.Feedback>
         </Form.Group>
         <Button disabled={invalid} type="submit">Add</Button>
      </Form>
   </Modal>
   )
}

const WeightList = ({listData}) => {
   return (
      <>
         {listData.length > 0
            ? (listData.map((item, i) =>  <WeightListItem key={i} weightItem={item} index={i}/>))
            : (
               <ListGroup.Item>
                  No Weigh Ins This Month
               </ListGroup.Item>
            )
         }
      </>
   )
}

const WeightListItem = ({weightItem}) => {
   const { date, weight } = weightItem;
   const momentObject = moment(date);
   const day = momentObject.format('ddd');
   const formattedDate = momentObject.format(DATE_FORMAT);
   return (
      <ListGroup.Item className="d-flex justify-content-between">
         <div>{day} {formattedDate}</div>
         <div><b>{weight}lbs</b></div>
      </ListGroup.Item>
   )
}

const Weight = withFirebase(WeightBase);

export default Weight;
