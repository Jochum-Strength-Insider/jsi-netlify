import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import moment from 'moment';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from '../Modal';
import Loading from '../Loading';
import PaginationBasic from '../PaginationBasic';
import StarRating from '../Rating';

const DIETSHELL = { createdAt: "3/4/2020", meals: { Breakfast: "", Lunch: "", Dinner: "", Snack1: "", Snack2: "", Snack3: "" }, rating: "" };

class Diet extends Component {
   constructor(props) {
      super(props);

      const currentDate = moment().format('YYYY-MM-DD');

      this.state = {
         // diets: JSON.parse(localStorage.getItem('diet')) || [],
         diets: [],
         lastVisible: "",
         loading: false,
         error: null,
         show: false,
         date: currentDate,
         queryDate: currentDate,
         isInvalid: false,
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

            // localStorage.setItem('diet', JSON.stringify(dietArray));
            this.setState({ diets: dietArray, loading: false });

         } else {
            // console.log("No diets / First Diet");
            // localStorage.removeItem('diet');
            this.setState({ diets: [], loading: false });
         }
      })
   }

   checkDietIdByDate = (createdAt) => {
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

   componentDidMount() {
      this.fetchDiets(this.state.queryDate);
      this.checkDietIdByDate(Number(moment(this.state.date).format("x")));
   }

   componentWillUnmount() {
      this.props.firebase.usersDiets(this.props.uid).off();
   }

   render() {
      const { diets, loading, error, queryDate } = this.state;
      const now = moment().format('YYYY-MM-DD');
      const nowDateUnix = Number(moment(now).format("x"));

      const paginate = (
         <div className="d-flex justify-content-center">
            <div>
               <PaginationBasic queryDate={queryDate} changeQueryDate={this.changeQueryDate} now={nowDateUnix} format={'YYYY-MM-DD'} spacing={'w'} />
            </div>
         </div>)

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

            <ListGroup className="mb-5">
               <ListGroup.Item className="py-sm-4 py-3">
                  <Button className="py-2" onClick={this.showModal} block>Add Diet Page</Button>
               </ListGroup.Item>

               {loading && <ListGroup.Item><Loading /></ListGroup.Item>}

               {
                  diets.length === 0 && (
                     <ListGroup.Item>No Diet Sheet Pages Yet!</ListGroup.Item>
                  )
               }

               {
                  diets.map((diet, index) => <DietSheetPage diet={diet} index={index} key={diet.key} uid={this.props.uid} />)
               }

               <ListGroup.Item>
                  {paginate}
               </ListGroup.Item>
            </ListGroup>
         </>
      )
   }
}


class DietSheetPageBase extends Component {

   // the component isn't updating on the first refresh. It reverts back to the previous state.
   // probably because of local storage not resetting on save.

   constructor(props) {
      super(props);
      this.timer = null;

      const initialDietState = this.props.diet.meals;
      const initialRating = this.props.diet.rating;

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
      this.setState({ [name]: value })
   }

   componentWillUnmount() {
      // this.props.firebase.usersDiet(this.props.uid, key)
      clearTimeout(this.timer);
   }

   render() {
      const { createdAt, key } = this.props.diet;
      const { index } = this.props;
      const { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3, error, alert, rating } = this.state;
      const date = moment(createdAt);
      const formattedDate = date.format('MM-DD-YYYY');
      const day = date.format('ddd');
      // const dateString = date.toLocaleDateString("en-US");
      // const pastDate = nowString !== dateString;
      const size = 12;

      return (
         <ListGroup.Item>
            <h3 className="text-center">{day} {formattedDate}</h3>
            <Form onSubmit={this.onSave(key)}>
               <Form.Row>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <Form.Label>Breakfast</Form.Label>
                     <Form.Control
                        aria-label={"Breakfast-tracking"}
                        type="text"
                        value={Breakfast}
                        name={"Breakfast"}
                        onChange={this.onChange}
                     />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} key={`${index}-lunch`} className="align-self-center">
                     <Form.Label>Lunch</Form.Label>
                     <Form.Control
                        aria-label={"Lunch-tracking"}
                        type="text"
                        value={Lunch}
                        name={"Lunch"}
                        onChange={this.onChange}
                     />

                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">

                     <Form.Label>Dinner</Form.Label>
                     <Form.Control
                        aria-label={"Dinner-tracking"}
                        type="text"
                        value={Dinner}
                        name={"Dinner"}
                        onChange={this.onChange}
                     />

                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <Form.Label>Snack 1</Form.Label>
                     <Form.Control
                        aria-label={"Snack1-tracking"}
                        type="text"
                        value={Snack1}
                        name={"Snack1"}
                        onChange={this.onChange}
                     />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <Form.Label>Snack 2</Form.Label>
                     <Form.Control
                        aria-label={"Snack2-tracking"}
                        type="text"
                        value={Snack2}
                        name={"Snack2"}
                        onChange={this.onChange}
                     />

                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <Form.Label>Snack 3</Form.Label>
                     <Form.Control
                        aria-label={"Snack3-tracking"}
                        type="text"
                        value={Snack3}
                        name={"Snack3"}
                        onChange={this.onChange}
                     />

                  </Form.Group>

                  <StarRating
                     rating={rating}
                     onChange={this.onChange}
                     size={size}
                     id={index}
                  />

                  {
                     // !pastDate && (
                     <Form.Group as={Col} xs={12} md={size}>
                        {
                           alert
                              ? <Button block type="submit" variant="outline-success">Saved!</Button>
                              : <Button block type="submit" variant="outline-primary">Save</Button>
                        }
                     </Form.Group>
                     // )
                  }

                  {error && <Alert variant="warning">{error.message}</Alert>}
               </Form.Row>
            </Form>
         </ListGroup.Item>
      )
   }
}

const DietSheetPage = withFirebase(DietSheetPageBase)

export default withFirebase(Diet);