import React, { Component, useState } from 'react';

import { withFirebase } from '../Firebase';
import moment from 'moment';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

import CustomToggle from '../CustomToggle';

class Diet extends Component {

   constructor(props) {
      super(props);

      this.currentDate = moment().format('YYYY-MM-DD');

      this.state = {
         diets: [],
         loading: false,
         error: null,
         date: this.currentDate,
         queryDate: this.currentDate,
      }
   }

   changeQueryDate = (date) => () => {
      this.setState({ queryDate: date });
      this.fetchDiets(date);
   }

   fetchDiets = (date) => {
      const startOf = Number(moment(date).startOf("week").format("x"));
      const endOf = Number(moment(date).endOf("week").format("x"));

      // const startOfFormatted = moment(date).startOf("month").format("YYYY-MM-DD");
      // const endOfFormatted = moment(date).endOf("month").format("YYYY-MM-DD");

      // const recentDate = Number(moment(date).format("x"));
      // const prevDate = Number(moment(date).subtract(1, "d").format("x"));

      this.setState({ loading: true });
      const query = this.props.firebase
         .usersDiets(this.props.uid)
         .orderByChild("createdAt")
         .startAt(startOf)
         .endAt(endOf)

      // Return items less than or equal to the specified key or value
      // .endAt(recentDate)
      // .limitToLast(7)
      // Return items greater than or equal to the specified key or value
      // .startAt(prevDate)

      query.once("value").then((snap) => {
         const dietsObject = snap.val();
         // snap.forEach(each => console.log(each));
         if (dietsObject) {

            const compareNumbers = (a, b) => {
               return b.createdAt - a.createdAt;
            }
            const keys = Object.keys(dietsObject);
            const dietArray = keys.map(key => {
               return { ...dietsObject[key], key: key }
            }).sort(compareNumbers);

            this.setState({ diets: dietArray, loading: false });

         } else {
            this.setState({ diets: [], loading: false });
         }
      })
   }

   componentDidMount() {
      this.fetchDiets(this.state.queryDate);
   }

   componentWillUnmount() {
      this.props.firebase.usersDiets(this.props.uid).off();
   }

   render() {
      const { diets, queryDate } = this.state;
      const now = moment().format('YYYY-MM-DD');
      const nowDateUnix = Number(moment(now).format("x"));

      return (
         <>
            <Card className="date-select-card">
               <Card.Body>
                  <DateCirlces queryDate={queryDate} changeQueryDate={this.changeQueryDate} now={nowDateUnix} />
               </Card.Body>
            </Card>

            <Accordion className="mb-5">
               {
                  diets.map((diet, index) => {

                     const { createdAt } = diet;
                     const date = moment(createdAt);
                     const month = date.format("MMM");
                     const dayNumber = date.format("DD");
                     // const formattedDate = date.format('YYYY-MM-DD');
                     const dayName = date.format('dddd');

                     return (
                        <Card key={diet.key} className="date-card user-program-day my-3 rounded">
                           <CustomToggle eventKey={diet.key} scroll={false}>
                              <Card.Body className="bg-purple" >
                                 <div className="d-flex justify-content-between">
                                    <h3 className="day-name" style={{ color: "white" }}>{dayName}</h3>
                                    <div className="date d-flex align-items-center justify-content-center">
                                       <div>
                                          <div className="day">{dayNumber}</div>
                                          <div className="month">{month}</div>
                                       </div>
                                    </div>
                                 </div>
                              </Card.Body>
                           </CustomToggle>
                           <Accordion.Collapse eventKey={diet.key}>
                              <DietSheetPage diet={diet} index={index} key={diet.key} uid={this.props.uid} />
                           </Accordion.Collapse>
                        </Card>
                     )
                  }
                  )
               }
            </Accordion>
         </>
      )
   }
}


class DietSheetPageBase extends Component {

   constructor(props) {
      super(props);
      this.timer = null;

      const initialDietState = this.props.diet.meals;
      const initialRating = this.props.diet.rating || 0;

      this.state = {
         Breakfast: initialDietState["Breakfast"],
         Lunch: initialDietState["Lunch"],
         Dinner: initialDietState["Dinner"],
         Snack1: initialDietState["Snack1"],
         Snack2: initialDietState["Snack2"],
         Snack3: initialDietState["Snack3"],
         rating: initialRating,
         error: null,
         alert: false,
      }
   }

   onAlert = () => {
      this.setState({ alert: true });
      this.timer = setTimeout(() => {
         this.setState({ alert: false });
      }, 2000);
   }

   onSave = (key) => (e) => {
      e.preventDefault();
      const { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3, rating } = this.state;
      const mealsUpdate = { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3 };

      this.props.firebase.usersDiet(this.props.uid, key)
         .update({ meals: mealsUpdate, rating })
         .then(this.onAlert)
         .catch(error => {
            this.setState({ error });
         });
   }

   onChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   }

   componentWillUnmount() {
      clearTimeout(this.timer);
   }

   render() {
      const { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3, error, rating } = this.state;

      return (
         <>
            <Row>
               <Col xs={12}>
                  <DietFormRow name="Breakfast" value={Breakfast} onChange={this.onChange} label={"Breakfast"} />
               </Col>

               <Col xs={12}><hr className="my-0"></hr></Col>

               <Col xs={12}>
                  <DietFormRow name="Lunch" value={Lunch} onChange={this.onChange} label={"Lunch"} />
               </Col>

               <Col xs={12}><hr className="my-0"></hr></Col>

               <Col xs={12}>
                  <DietFormRow name="Dinner" value={Dinner} onChange={this.onChange} label={"Dinner"} />
               </Col>

               <Col xs={12}><hr className="my-0"></hr></Col>

               <Col xs={12}>
                  <DietFormRow name="Snack1" value={Snack1} onChange={this.onChange} label={"Snack 1"} />
               </Col>

               <Col xs={12}><hr className="my-0"></hr></Col>

               <Col xs={12}>
                  <DietFormRow name="Snack2" value={Snack2} onChange={this.onChange} label={"Snack 2"} />
               </Col>

               <Col xs={12}><hr className="my-0"></hr></Col>

               <Col xs={12}>
                  <DietFormRow name="Snack3" value={Snack3} onChange={this.onChange} label={"Snack 3"} />
               </Col>

               <Col xs={12}><hr className="my-0"></hr></Col>

               <Col xs={12}>
                  <DietFormRatingRow name="rating" value={rating} onChange={this.onChange} label={"Rating"} />
               </Col>

               <Col xs={12}><hr className="my-0"></hr></Col>

               {error && <Alert variant="warning">{error.message}</Alert>}
            </Row>
         </>
      )
   }
}

const DietFormRow = ({ onChange, value, label, name }) => {
   const [open, setOpen] = useState(true);
   return (
      <>
         <div
            className="diet-form-toggle"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
         >
            <div className="d-flex justify-content-between">
               <div>{label}</div>
               <div>{open ? <span>&minus;</span> : <span>&#65291;</span>}</div>
            </div>
         </div>

         <Collapse in={open}>
            <p style={{ color: "gray" }}>{value ? value : "No meal entered"}</p>
         </Collapse>
      </>
   )
}

const DietFormRatingRow = ({ value, label, name }) => {
   const [open, setOpen] = useState(true);
   return (
      <>
         <div
            className="diet-form-toggle"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
         >
            <div className="d-flex justify-content-between">
               <div>{label}</div>
               <div>{open ? <span>&minus;</span> : <span>&#65291;</span>}</div>
            </div>
         </div>

         <Collapse in={open}>
            <p>{value}</p>
         </Collapse>
      </>
   )
}

const DateCirlces = ({ queryDate, changeQueryDate }) => {
   const startOfWeekFormat = moment(queryDate).startOf("w").format('DD');
   const endOfWeekFormat = moment(queryDate).endOf("w").format('DD');

   const startOfMonth = moment(queryDate).startOf("M").format('MMM YYYY');

   const nowUnix = Number(moment().format("x"));

   const prevWeek = moment(queryDate).subtract(1, "w").format('YYYY-MM-DD');
   const nextWeek = moment(queryDate).add(1, "w").format('YYYY-MM-DD');
   const nextWeekUnix = Number(moment(queryDate).add(1, "w").format('x'));

   const disabled = nextWeekUnix > nowUnix;

   return (
      <>
         <div className="d-flex justify-content-between date-circles">

            <button onClick={changeQueryDate(prevWeek)} className="date previous d-flex align-items-center justify-content-center">
               <div>
                  <div>&#8249;</div>
               </div>
            </button>

            <div className="d-flex align-items-center"><h3 className="text-center no-padding"> {`${startOfWeekFormat}-${endOfWeekFormat}  ${startOfMonth}`}</h3></div>

            <button
               onClick={changeQueryDate(nextWeek)}
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

const DietSheetPage = withFirebase(DietSheetPageBase)

export default withFirebase(Diet);