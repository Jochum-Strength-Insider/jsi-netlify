import React, { Component, useContext } from 'react';

import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

import { AuthUserContext } from '../Session';
import Modal from '../Modal';
import Diet from '../Diet';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { Scatter } from 'react-chartjs-2';
import moment from 'moment';
// import { Line } from 'react-chartjs-2';
// import { Bar } from 'react-chartjs-2';

const data = {
   "0": { date: "3/1/2020", weight: "180" },
   "1": { date: "3/2/2020", weight: "185" },
   "2": { date: "3/3/2020", weight: "184" },
   "3": { date: "3/4/2020", weight: "182" }
}

const TrackingPage = () => {

   const authUser = useContext(AuthUserContext);
   return (
      <>
         <h1 className="color-white">Tracking Page</h1>
         <Weight authUser={authUser} data={data} />
         <Diet uid={authUser.uid} ids={authUser.dietIds} />
      </>
   )
}

class WeightBase extends Component {
   constructor(props) {
      super(props);

      this.dataSetOptions = {
         label: 'Weight',
         fill: false,
         lineTension: .3,
         // backgroundColor: 'rgba(765, 42, 52)',
         borderColor: 'rgba(65, 42, 52)',
         // borderCapStyle: 'butt',
         // borderJoinStyle: 'miter',
         pointBorderColor: 'rgb(65, 42, 52)',
         pointBackgroundColor: 'rgba(65, 42, 52)',
         pointBorderWidth: 1,
         pointHoverRadius: 5,
         // pointHoverBackgroundColor: 'rgba(65, 42, 52)',
         // pointHoverBorderColor: 'rgba(65, 42, 52)',
         pointHoverBorderWidth: 2,
         pointRadius: 3,
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
         show: false,
         options: {},
         weight: "180",
         lastDate: "",
         invalid: false,
         error: null,
      }
   }

   onChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value })
   }

   addWeightIn = (e) => {
      e.preventDefault();
      const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const nowString = moment().format("MMM D");
      const lastDatestring = moment(this.state.lastDate).format("MMM D");

      if (lastDatestring === nowString) {
         this.setState({ invalid: true })
      } else {
         console.log("Checked In Added", this.state.weight)
         this.props.firebase.weighIn(this.props.authUser.uid).push({ date: timestamp, weight: this.state.weight })
            .then(this.hideModal)
            .catch(error => this.setState({ error }))
      }
      // console.log(this.state.weight, "clicked");
      // this.hideModal()
   }

   showModal = () => this.setState({ show: true });
   hideModal = () => this.setState({ show: false, invalid: false });

   fetchData = () => {

      // const quickAdd = [
      //    { date: new Date("2/26/2020").getTime(), weight: "184" },
      //    { date: new Date("2/27/2020").getTime(), weight: "183" },
      //    { date: new Date("2/28/2020").getTime(), weight: "182" },
      //    { date: new Date("3/1/2020").getTime(), weight: "180" },
      //    { date: new Date("3/2/2020").getTime(), weight: "179" },
      //    { date: new Date("3/6/2020").getTime(), weight: "178" },
      //    { date: new Date("3/8/2020").getTime(), weight: "177" },
      //    { date: new Date("3/15/2020").getTime(), weight: "176" },
      // ]
      // quickAdd.map(key => this.props.firebase.weighIn(this.props.authUser.uid).push(key));

      this.props.firebase
         .weighIn(this.props.authUser.uid)
         // .orderByChild("date")
         .limitToLast(7)
         .on("value", (snap) => {
            const weighInObject = snap.val();

            if (weighInObject) {

               const dataArray = Object.keys(weighInObject)
                  .map(
                     key => {
                        return weighInObject[key];
                     }
                  );

               const weightData = dataArray.map(item => item.weight);
               const dateLabels = dataArray.map((item, idx) => {
                  const date = new Date(item.date);
                  // return moment(date, "MMM D");
                  return moment(date).startOf("day");
               });

               const chartData = {
                  labels: dateLabels,
                  // labels: ["Scatter"],
                  datasets: [
                     {
                        ...this.dataSetOptions,
                        data: weightData
                     }
                  ],
               };

               const options = {
                  responsive: true,
                  legend: {
                     display: false,
                  },
                  title: {
                     display: true,
                     text: 'Weight'
                  },
                  animation: {
                     animateScale: true
                  },
                  tooltips: {
                     callbacks: {
                        label: function (tooltipItem, data) {
                           const label = data.labels[tooltipItem.index];
                           const toDay = label.format("MMM D");
                           const weight = tooltipItem.yLabel;
                           return toDay + ": " + weight + "lbs";
                        }
                     }
                  },
                  scales: {
                     yAxes: [{
                        ticks: {
                           // beginAtZero: true,
                           callback: function (value) { if (Number.isInteger(value)) { return value; } },
                           stepSize: 1,
                           suggestedMin: Math.min(...weightData) - 5,
                           suggestedMax: Math.max(...weightData) + 5,
                        },
                        scaleLabel: {
                           display: true,
                           labelString: 'lbs'
                        }
                     }],
                     xAxes: [{
                        // time settings
                        type: 'time',
                        time: {
                           unit: 'day',
                           unitStepSize: 1,
                           displayFormats: {
                              day: 'MMM D'
                           }
                        },
                        scaleLabel: {
                           display: true,
                           labelString: 'Date',
                        },
                        distribution: 'linear',
                     }]
                  }
               }

               this.setState({ data: chartData, options: options, weight: weightData[weightData.length - 1], lastDate: dateLabels[dateLabels.length - 1] });
            }
         })
   }

   componentDidMount() {
      this.fetchData()
   }

   render() {

      return (
         <>
            <Modal show={this.state.show} handleClose={this.hideModal} heading={"Add Weigh In"}>
               <Form onSubmit={this.addWeightIn}>
                  <Form.Group>
                     <Form.Label>Add Weigh In</Form.Label>
                     <Form.Control
                        type="number"
                        name="weight"
                        onChange={this.onChange}
                        value={this.state.weight}
                        required
                        isInvalid={this.state.invalid}
                     />
                     <Form.Control.Feedback type="invalid">
                        Already Checked In Today.
                     </Form.Control.Feedback>
                  </Form.Group>
                  <Button disabled={this.state.invalid} type="submit">Add</Button>
               </Form>
            </Modal>

            <Card className="my-3">
               <Card.Header>
                  <h3>Tracking Component</h3>
               </Card.Header>
               <Card.Body>
                  {this.state.error && <Alert variant="warning">{this.state.error.message}</Alert>}

                  <Scatter
                     data={this.state.data}
                     options={this.state.options}
                  />

                  <Form className="mt-3">
                     <Button block variant="outline-primary" onClick={this.showModal}>Add Weigh In</Button>
                  </Form>
               </Card.Body>
            </Card>
         </>
      )
   }
}

const Weight = withFirebase(WeightBase);

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(TrackingPage);