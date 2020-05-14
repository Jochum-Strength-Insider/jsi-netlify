import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import { Line } from 'react-chartjs-2';
import moment from 'moment';

class WeightBase extends Component {
   constructor(props) {
      super(props);

      this.currentDate = moment();

      this.dataSetOptions = {
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

      const initialData = {
         labels: [],
         datasets: [
            {
               ...this.dataSetOptions,
               data: [],
            }
         ],

      };


      this.state = {
         tracking: [],
         loading: false,
         data: initialData,
         listData: [],
         show: false,
         options: {},
         invalid: false,
         date: this.currentDate.format('YYYY-MM-DD'),
         queryDate: this.currentDate.format('YYYY-MM-DD'),
         error: null,
      }
   }

   options = (title, weightData) => {
      const gridColor = "rgba(255, 255, 255, 0.100)";
      const tickColor = "white";

      return {
         responsive: true,
         // maintainAspectRatio: false,
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
               // label: function (tooltipItem, data) {
               //    const label = data.labels[tooltipItem.index];
               //    const toDay = label.format("MMM D");
               //    const weight = tooltipItem.yLabel;
               //    return toDay + ": " + weight + "lbs";
               // },
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
                  // lineWidth: 2,
                  // zeroLineWidth: 2
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
                  // lineWidth: 2,
                  // zeroLineWidth: 2
               },
            }]
         }
      }
   }

   fetchData = (date, onMount) => {
      this.setState({ loading: true });

      const month = moment(date).format("MMMM");
      const startOf = Number(moment(date).startOf("month").format("x"));
      const endOf = Number(moment(date).endOf("month").format("x"));

      this.props.firebase
         .weighIn(this.props.uid)
         .orderByChild("date")
         .startAt(startOf)
         .endAt(endOf)
         .once("value", (snap) => {
            const weighInObject = snap.val();

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
                        ...this.dataSetOptions,
                        data: weightDataFullMonth
                     }
                  ],
               };

               const newOptions = this.options(month, weightData);

               if (onMount) {
                  this.setState({ data: chartData, listData: dataArray, options: newOptions, weight: weightData[weightData.length - 1], loading: false });
               } else {
                  this.setState({ data: chartData, listData: dataArray, options: newOptions, loading: false });
               }
            } else {
               const weightData = [null, null];

               const chartData = {
                  labels: [startOf, endOf],
                  datasets: [
                     {
                        ...this.dataSetOptions,
                        data: weightData
                     }
                  ],
               };
               const newOptions = this.options(month, ["180"]);
               if (onMount) {
                  this.setState({ data: chartData, listData: [], options: newOptions, weight: '180', loading: false });
               } else {
                  this.setState({ data: chartData, listData: [], options: newOptions, loading: false });
               }
            }
         })
   }

   changeQueryDate = (date) => () => {
      this.setState({ queryDate: date });
      this.fetchData(date, false);
   }

   componentDidMount() {
      this.fetchData((this.state.queryDate), true);
   }

   componentWillUnmount() {
      this.props.firebase.weighIn(this.props.uid).off();
   }

   render() {

      const { data, listData, options, error, queryDate } = this.state;
      const now = moment().format('YYYY-MM-DD');
      const chartTitle = moment(queryDate).format('MMMM YYYY');
      const nowDateUnix = Number(moment(now).format("x"));

      return (
         <>
            <div className="canvas-container mb-3">
               <h3 className="text-center" style={{ color: "white" }}>{chartTitle}</h3>
               <Line
                  data={data}
                  options={options}
               />
            </div>

            <ListGroup>
               <ListGroup.Item>
                  <MonthCirlces onDayClicked={this.onDayClicked} queryDate={queryDate} changeQueryDate={this.changeQueryDate} now={nowDateUnix} />
               </ListGroup.Item>

               {listData.length > 0 ?
                  (listData.map(item => {
                     const { date, weight } = item;
                     const momentObject = moment(date);
                     const formattedDate = momentObject.format('MM-DD-YYYY');
                     const day = momentObject.format('ddd');
                     return (
                        <ListGroup.Item className="d-flex justify-content-between" key={date}>
                           <div>{day} {formattedDate}</div>
                           <div><b>{weight}lbs</b></div>
                        </ListGroup.Item>
                     )
                  })) : (
                     <>
                        <ListGroup.Item>
                           No Weigh Ins This Month
                        </ListGroup.Item>
                     </>
                  )
               }
            </ListGroup>
            {error && <ListGroup><Alert variant="warning">{error.message}</Alert></ListGroup>}
         </>
      )
   }
}

const MonthCirlces = ({ queryDate, changeQueryDate }) => {
   const startOfMonth = moment(queryDate).startOf("M");

   const nowUnix = Number(moment().format("x"));

   const prevMonth = moment(queryDate).subtract(1, "M").format('YYYY-MM-DD');
   const nextMonth = moment(queryDate).add(1, "M").format('YYYY-MM-DD');
   const nextMonthUnix = Number(moment(queryDate).add(1, "M").format('x'));

   const pastMonths = [2, 1].map(sub => {
      const date = moment(startOfMonth).subtract(sub, "M")
      const formatted = date.format('YYYY-MM-DD');
      const month = date.format('MMM');
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
         month
      }
   });

   const thisMonth = {
      formatted: moment(startOfMonth).format('YYYY-MM-DD'),
      month: moment(startOfMonth).format('MMM'),
      unix: Number(moment(startOfMonth).format("x")),
   }

   const futureMonths = [1, 2].map(add => {
      const date = moment(startOfMonth).add(add, "M")
      const formatted = date.format('YYYY-MM-DD');
      const month = date.format('MMM');
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
         month
      }
   });

   const disabled = nextMonthUnix > nowUnix;

   return (
      <>
         <div className="d-flex justify-content-between date-circles">

            <button onClick={changeQueryDate(prevMonth)} className="date previous d-flex align-items-center justify-content-center">
               <div>
                  <div>&#8249;</div>
               </div>
            </button>

            {
               pastMonths.map((month, index) => {
                  if (index === 1) {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-sm-flex align-items-center justify-content-center`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  } else {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-md-flex align-items-center justify-content-center`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  }
               })
            }

            <button
               onClick={changeQueryDate(thisMonth.formatted)}
               key={thisMonth.unix}
               disabled={thisMonth.unix > nowUnix}
               className={`date d-flex align-items-center justify-content-center current-date`}
            >
               <div>
                  <div className="month">{thisMonth.month}</div>
               </div>
            </button>

            {
               futureMonths.map((month, index) => {
                  if (index === 1) {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-md-flex align-items-center justify-content-center ${month.unix > nowUnix && "future-date"}`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  } else {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-sm-flex align-items-center justify-content-center ${month.unix > nowUnix && "future-date"}`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  }

               })
            }

            <button
               onClick={changeQueryDate(nextMonth)}
               disabled={disabled}
               className={`date next d-flex align-items-center justify-content-center ${disabled && "disabled"}`}>
               <div>
                  <div>&#8250;</div>
               </div>
            </button>
         </div>
      </>
   )
}

const Weight = withFirebase(WeightBase);

export default Weight;
