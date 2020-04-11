import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import moment from 'moment';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Pagination from 'react-bootstrap/Pagination';
import Modal from '../Modal';

const DIETSHELL = { createdAt: "3/4/2020", meals: { Breakfast: "", Lunch: "", Dinner: "", Snack1: "", Snack2: "", Snack3: "", } };

//TODO
// Should I have it scroll through the idsList and use startAt(index).endAt(index) instead???
// Restructure dietIds to own folder. Not part of userObject. Listen for changes to it onMount.


class Diet extends Component {
   constructor(props) {
      super(props);

      const currentDate = moment().format('YYYY-MM-DD');

      this.state = {
         diets: JSON.parse(localStorage.getItem('diet')) || [],
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
         console.log(date);
         this.props.firebase.usersDiets(this.props.uid).push(newDiet)
            .then((snap) => {
               this.hideModal();
               const key = snap.key
               this.props.firebase.dietIds(this.props.uid).update({ [key]: newDate })
               this.setState({ isInvalid: true });
            })
            .catch(error => {
               this.setState({ error });
            });
      }
   }

   loadPrevious = () => {
      const newDate = moment(this.state.queryDate).subtract(1, "w").format("YYYY-MM-DD");
      console.log(newDate);
      this.setState({ queryDate: newDate });
      this.fetchDiets(newDate);
   }

   changeQueryDate = (date) => () => {
      this.setState({ queryDate: date });
      this.fetchDiets(date);
   }

   fetchDiets = (date) => {
      // Figure out pagination

      const recentDate = Number(moment(date).format("x"));
      // const prevDate = Number(moment(date).subtract(1, "d").format("x"));
      // console.log(start);
      //[1,2,3,4,5,6,7, 8, 9, 10]
      // limitToLast(3) - [8,9,10]
      // limitToFirst(3) - [1,2,3]

      this.setState({ loading: true });
      const query = this.props.firebase
         .usersDiets(this.props.uid)
         .orderByChild("createdAt")
         // Return items less than or equal to the specified key or value
         .endAt(recentDate)
         // .limitToFirst(7)
         .limitToLast(7)
      // Return items greater than or equal to the specified key or value
      // .startAt(prevDate)

      query.on("value", (snap) => {
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
            console.log(dietArray);

            localStorage.setItem('diet', JSON.stringify(dietArray));
            this.setState({ diets: dietArray, loading: false });

         } else {
            console.log("No diets / First Diet");
            localStorage.removeItem('diet');
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
      // const queryDateUnix = Number(moment(queryDate).format("x"));
      // const dietKeysArray = diets.map(diet => diet.key);

      // const loadRecent = queryDateUnix < nowDateUnix ? true : false;
      // const loadPrevious = dietKeysArray.length >= 7 ? true : false;

      const paginate = (
         <div className="d-flex justify-content-center">
            <div>
               <PaginationBasic queryDate={queryDate} changeQueryDate={this.changeQueryDate} now={nowDateUnix} />
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

            <ListGroup className="mb-5 mt-4">
               <ListGroup.Item>
                  <Button className="py-2 my-2" onClick={this.showModal} block>Add Diet Page</Button>
               </ListGroup.Item>

               {loading && <ListGroup.Item>Loading ...</ListGroup.Item>}

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

const PaginationBasic = ({ queryDate, changeQueryDate, now }) => {
   const weeks = [1, 2];
   const currentDate = {
      formatted: queryDate,
      unix: Number(moment(queryDate).format("x"))
   }
   const pastDates = weeks.reverse().map(sub => {
      const date = moment(queryDate).subtract(sub, 'w')
      const formatted = date.format('YYYY-MM-DD');
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
      }
   });
   const futureDates = weeks.map(add => {
      const date = moment(queryDate).add(add, 'w')
      const formatted = date.format('YYYY-MM-DD');
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
      }
   });
   const dates = [...pastDates, currentDate, ...futureDates];
   // const now = Number(moment().format('x'));

   const paginationDates = dates.map((date, idx) => {
      return (
         <Pagination.Item key={date.unix} active={date.formatted === queryDate} disabled={date.unix > now} onClick={changeQueryDate(date.formatted)}>
            {date.formatted}
         </Pagination.Item>
      )
   })
   const prevWeek = pastDates[0];
   const prevWeekButton = <Pagination.Prev disabled={prevWeek.unix > now} onClick={changeQueryDate(prevWeek.formatted)} />

   const nextWeek = futureDates[0];
   const nextWeekButton = <Pagination.Next disabled={nextWeek.unix > now} onClick={changeQueryDate(nextWeek.formatted)} />

   return <Pagination className="my-0 py-0">{prevWeekButton}{paginationDates}{nextWeekButton}</Pagination>
};


class DietSheetPageBase extends Component {
   constructor(props) {
      super(props);

      const initialDietState = this.props.diet.meals;
      this.state = {
         Breakfast: initialDietState["Breakfast"],
         Lunch: initialDietState["Lunch"],
         Dinner: initialDietState["Dinner"],
         Snack1: initialDietState["Snack1"],
         Snack2: initialDietState["Snack2"],
         Snack3: initialDietState["Snack3"],
         error: null,
         alert: false,
      }
   }

   onAlert = () => {
      this.setState({ alert: true });
      setTimeout(() => {
         this.setState({ alert: false });
      }, 2000);
   }

   onSave = (key) => (e) => {
      e.preventDefault();
      const { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3 } = this.state;
      const mealsUpdate = { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3 };

      this.props.firebase.usersDiet(this.props.uid, key)
         .update({ meals: mealsUpdate })
         .then(this.onAlert)
         .catch(error => {
            this.setState({ error });
         });
   }

   onChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value })
   }

   render() {
      const { createdAt, key } = this.props.diet;
      const { index } = this.props;
      const { Breakfast, Lunch, Dinner, Snack1, Snack2, Snack3, error, alert } = this.state;
      const date = moment(createdAt).format('MM-DD-YYYY');
      // const dateString = date.toLocaleDateString("en-US");
      // const pastDate = nowString !== dateString;
      const size = 12;
      const inputGroupWidth = { width: "6rem" };

      return (
         <ListGroup.Item>
            <Form onSubmit={this.onSave(key)}>
               <Form.Label>{date}</Form.Label>
               <Form.Row>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <InputGroup className="">
                        <InputGroup.Prepend>
                           <InputGroup.Text style={inputGroupWidth} id={`basic-addon-meal-${index + 1}`}>Breakfast</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                           aria-label={"Breakfast-tracking"}
                           type="text"
                           value={Breakfast}
                           name={"Breakfast"}
                           onChange={this.onChange}
                           aria-describedby={`basic-addon-meal-${index + 1}`}
                        />
                     </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} key={`${index}-lunch`} className="align-self-center">
                     <InputGroup className="">
                        <InputGroup.Prepend >
                           <InputGroup.Text style={inputGroupWidth} id={`basic-addon-meal-${index + 1}`}>Lunch</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                           aria-label={"Lunch-tracking"}
                           type="text"
                           value={Lunch}
                           name={"Lunch"}
                           onChange={this.onChange}
                           aria-describedby={`basic-addon-meal-${index + 1}`}
                        />
                     </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <InputGroup className="">
                        <InputGroup.Prepend>
                           <InputGroup.Text style={inputGroupWidth} id={`basic-addon-meal-${index + 1}`}>Dinner</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                           aria-label={"Dinner-tracking"}
                           type="text"
                           value={Dinner}
                           name={"Dinner"}
                           onChange={this.onChange}
                           aria-describedby={`basic-addon-meal-${index + 1}`}
                        />
                     </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <InputGroup className="">
                        <InputGroup.Prepend>
                           <InputGroup.Text style={inputGroupWidth} id={`basic-addon-meal-${index + 1}`}>Snack 1</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                           aria-label={"Snack1-tracking"}
                           type="text"
                           value={Snack1}
                           name={"Snack1"}
                           onChange={this.onChange}
                           aria-describedby={`basic-addon-meal-${index + 1}`}
                        />
                     </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <InputGroup className="">
                        <InputGroup.Prepend>
                           <InputGroup.Text style={inputGroupWidth} id={`basic-addon-meal-${index + 1}`}>Snack 2</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                           aria-label={"Snack2-tracking"}
                           type="text"
                           value={Snack2}
                           name={"Snack2"}
                           onChange={this.onChange}
                           aria-describedby={`basic-addon-meal-${index + 1}`}
                        />
                     </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={size} className="align-self-center">
                     <InputGroup className="">
                        <InputGroup.Prepend>
                           <InputGroup.Text style={inputGroupWidth} id={`basic-addon-meal-${index + 1}`}>Snack 3</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                           aria-label={"Snack3-tracking"}
                           type="text"
                           value={Snack3}
                           name={"Snack3"}
                           onChange={this.onChange}
                           aria-describedby={`basic-addon-meal-${index + 1}`}
                        />
                     </InputGroup>
                  </Form.Group>

                  {
                     // !pastDate && (
                     <Form.Group as={Col} xs={12} md={size}>
                        {
                           alert
                              ? <Button block type="submit" className="mx-1 px-5" variant="outline-success">Saved!</Button>
                              : <Button block type="submit" className="mx-1 px-5" variant="outline-primary">Save</Button>
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