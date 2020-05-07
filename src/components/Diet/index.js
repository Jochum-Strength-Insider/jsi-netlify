import React, { Component, useState } from 'react';

import "./style.css";

import { withFirebase } from '../Firebase';
import moment from 'moment';

// import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Modal from '../Modal';
// import Loading from '../Loading';
import CustomToggle from '../CustomToggle';

import dietImage from '../../images/diet.jpg'

const DIETSHELL = { createdAt: "3/4/2020", meals: { Breakfast: "", Lunch: "", Dinner: "", Snack1: "", Snack2: "", Snack3: "" }, rating: "0" };

class Diet extends Component {

   constructor(props) {
      super(props);

      this.currentDate = moment().format('YYYY-MM-DD');

      this.state = {
         // diets: JSON.parse(localStorage.getItem('diet')) || [],
         diets: [],
         lastVisible: "",
         loading: false,
         error: null,
         show: false,
         date: this.currentDate,
         queryDate: this.currentDate,
         isInvalid: false,
         refsList: {},
      }
   }

   showModal = () => this.setState({ show: true });
   hideModal = () => this.setState({ show: false });

   onDateChange = (e) => {
      const { name, value } = e.target;
      const newDate = Number(moment(e.target.value).format("x"));
      this.checkDietIdByDate(newDate);
      this.setState({ [name]: value });
   }

   addDate = (e) => {
      e.preventDefault();
      const { date, isInvalid } = this.state;
      const newDate = Number(moment(date).format("x"));

      const newDiet = { ...DIETSHELL };
      newDiet["createdAt"] = newDate;

      if (!isInvalid) {
         // console.log(date);
         this.props.firebase.usersDiets(this.props.uid).push(newDiet)
            .then((snap) => {
               this.hideModal();
               const key = snap.key
               this.props.firebase.dietIds(this.props.uid).update({ [key]: newDate });
               this.fetchDiets(date);
               this.setState({ isInvalid: true, queryDate: date });
            })
            .catch(error => {
               this.setState({ error });
            });
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
            // console.log(dietArray);

            const refsList = dietArray.reduce((acc, diet, idx) => {
               const dayName = moment(diet.createdAt).format('YYYY-MM-DD');
               acc[dayName] = React.createRef();
               return acc;
            }, {});

            // localStorage.setItem('diet', JSON.stringify(dietArray));
            this.setState({ diets: dietArray, refsList, loading: false });

         } else {
            // localStorage.removeItem('diet');
            this.setState({ diets: [], loading: false });
         }
      })
   }

   checkDietIdByDate = (createdAt) => {
      if (isNaN(createdAt)) {
         return console.log('Not a Number!');
      }

      return this.props.firebase
         .dietIds(this.props.uid)
         .orderByValue()
         .equalTo(createdAt)
         .once('value')
         .then(snap => {
            const dietId = snap.val();
            if (dietId) {
               this.setState({ isInvalid: true });
            } else {
               this.setState({ isInvalid: false });
            }
         })
         .catch(error => this.setState(error));
   }

   checkToday = (createdAt) => {
      if (isNaN(createdAt)) {
         return console.log('Not a Number!');
      }

      return this.props.firebase
         .dietIds(this.props.uid)
         .orderByValue()
         .equalTo(createdAt)
         .once('value')
         .then(snap => {
            const dietId = snap.val();
            if (dietId) {
               this.setState({ show: false });
            } else {
               this.setState({ show: true });
            }
         })
         .catch(error => this.setState(error));
   }

   onDayClicked = idx => {
      if (this.state.refsList[idx]) {
         const { current } = this.state.refsList[idx];
         current.scrollIntoView({ block: "center" });
         current.click();
      } else {
         const newDate = Number(moment(idx).format("x"));
         this.checkDietIdByDate(newDate);
         this.setState({ date: idx, show: true });
      }
   }

   componentDidMount() {
      this.fetchDiets(this.state.queryDate);
      this.checkDietIdByDate(Number(moment(this.state.date).format("x")));
      this.checkToday(Number(moment(this.currentDate).format("x")));
   }

   componentWillUnmount() {
      this.props.firebase.usersDiets(this.props.uid).off();
   }

   render() {
      const { diets, error, queryDate } = this.state;
      const now = moment().format('YYYY-MM-DD');
      const nowDateUnix = Number(moment(now).format("x"));

      return (
         <>
            <Modal show={this.state.show} handleClose={this.hideModal} heading={"Add Diet Sheet Page"}>
               <Form onSubmit={this.addDate}>
                  <Form.Group>
                     <Form.Label>Date</Form.Label>
                     <Form.Control
                        type="date"
                        name="date"
                        max={now}
                        onChange={this.onDateChange}
                        value={this.state.date}
                        isInvalid={this.state.isInvalid}
                     />
                     <Form.Control.Feedback type="invalid">
                        Diet Sheet Page Already Exists
                     </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" block disabled={this.state.isInvalid}>Add Page</Button>
                  {error && <Alert variant="warning">{error.message}</Alert>}
               </Form>
            </Modal>

            <Card className="date-select-card">
               <Card.Img variant="top" src={dietImage} />
               <Card.Body>
                  <DateCirlces onDayClicked={this.onDayClicked} queryDate={queryDate} changeQueryDate={this.changeQueryDate} now={nowDateUnix} />
               </Card.Body>
            </Card>

            <Accordion className="mb-5">
               {
                  diets.map((diet, index) => {

                     const { createdAt } = diet;
                     const date = moment(createdAt);
                     const month = date.format("MMM");
                     const dayNumber = date.format("DD");
                     const formattedDate = date.format('YYYY-MM-DD');
                     const dayName = date.format('dddd');

                     return (
                        <Card key={diet.key} className="date-card user-program-day my-3 rounded">
                           <CustomToggle eventKey={diet.key} scroll={false}>
                              <Card.Body className="bg-purple" ref={this.state.refsList[formattedDate]}>
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

            <Button className=" my-5 py-2" onClick={this.showModal} block>Add Diet Page</Button>
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
      // this.props.firebase.usersDiet(this.props.uid, key)
      clearTimeout(this.timer);
   }

   render() {
      // const { createdAt, key } = this.props.diet;
      const { key } = this.props.diet;
      const { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3, error, alert, rating } = this.state;
      // const date = moment(createdAt);
      // const formattedDate = date.format('MM-DD-YYYY');
      // const day = date.format('ddd');
      // const dateString = date.toLocaleDateString("en-US");
      // const pastDate = nowString !== dateString;
      // const size = 12;

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

               <Col className="mt-3" xs={12}>
                  <Form.Group as={Col} xs={12}>
                     {
                        alert
                           ? <Button block onClick={this.onSave(key)} type="submit" variant="outline-success">Saved!</Button>
                           : <Button block onClick={this.onSave(key)} type="submit" variant="outline-primary">Save</Button>
                     }
                  </Form.Group>
               </Col>

               {error && <Alert variant="warning">{error.message}</Alert>}
            </Row>
         </>
      )
   }
}

const DietFormRow = ({ onChange, value, label, name }) => {
   const [open, setOpen] = useState(false);
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
            <Form.Group className="align-self-center">
               <Form.Control
                  aria-label={`${name}-tracking`}
                  type="text"
                  value={value}
                  name={name}
                  onChange={onChange}
               />
            </Form.Group>
         </Collapse>
      </>
   )
}

const DietFormRatingRow = ({ onChange, value, label, name }) => {
   const [open, setOpen] = useState(false);
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
            <Form.Group className="align-self-center">
               <Form.Control as="select" name="rating" value={value} onChange={onChange}>
                  <option value={"0"}>0</option>
                  <option value={"1"}>1</option>
                  <option value={"2"}>2</option>
                  <option value={"3"}>3</option>
                  <option value={"4"}>4</option>
                  <option value={"5"}>5</option>
               </Form.Control>
            </Form.Group>
         </Collapse>
      </>
   )
}

const DateCirlces = ({ queryDate, changeQueryDate, onDayClicked }) => {
   const startOfWeek = Number(moment(queryDate).startOf("w").format('x'));
   const startOfWeekFormat = moment(queryDate).startOf("w").format('DD');
   const endOfWeekFormat = moment(queryDate).endOf("w").format('DD');

   const startOfMonth = moment(queryDate).startOf("M").format('MMM YYYY');

   const nowFormatted = moment().format("YYYY-MM-DD");
   const nowUnix = Number(moment().format("x"));

   const prevWeek = moment(queryDate).subtract(1, "w").format('YYYY-MM-DD');
   // const prevWeekUnix = Number(moment(queryDate).subtract(1, "w").format('x'));
   const nextWeek = moment(queryDate).add(1, "w").format('YYYY-MM-DD');
   const nextWeekUnix = Number(moment(queryDate).add(1, "w").format('x'));

   const daysOfWeek = [0, 1, 2, 3, 4, 5, 6].map(add => {
      const date = moment(startOfWeek).add(add, "d")
      const formatted = date.format('YYYY-MM-DD');
      const day = date.format('DD');
      const month = date.format('MMM');
      const unix = Number(date.format("x"));
      const startOf = moment(date).startOf("day").format('YYYY-MM-DD');
      return {
         formatted,
         unix,
         startOf,
         day,
         month
      }
   });

   const disabled = nextWeekUnix > nowUnix;

   const handleClicked = key => (e) => {
      e.preventDefault();
      onDayClicked(key);
   }

   return (
      <>
         <h3 className="text-center">{startOfMonth}</h3>
         <div className="d-flex justify-content-between date-circles">

            <button onClick={changeQueryDate(prevWeek)} className="date previous d-flex align-items-center justify-content-center">
               <div>
                  <div>&#8249;</div>
               </div>
            </button>

            <div className="d-flex align-items-center d-md-none d-lg-none d-xl-none"><h5 className="no-padding">{`${startOfWeekFormat} - ${endOfWeekFormat}`}</h5></div>

            {
               daysOfWeek.map((day, index) => {
                  if (day.formatted === nowFormatted) {
                     return (
                        <button
                           onClick={handleClicked(day.formatted)}
                           key={day.unix}
                           disabled={day.unix > nowUnix}
                           className={`date d-none d-md-flex align-items-center justify-content-center current-date`}
                        >
                           <div>
                              <div className="day">{day.day}</div>
                              <div className="month">{day.month}</div>
                           </div>
                        </button>
                     )
                  } else {
                     return (
                        <button
                           onClick={handleClicked(day.formatted)}
                           key={day.unix}
                           disabled={day.unix > nowUnix}
                           className={`date d-none d-md-flex align-items-center justify-content-center ${day.unix > nowUnix && "future-date"}`}
                        >
                           <div>
                              <div className="day">{day.day}</div>
                              <div className="month">{day.month}</div>
                           </div>
                        </button>
                     )
                  }

               })
            }

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