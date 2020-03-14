import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const DIETSHELL = { createdAt: "3/4/2020", meals: { Breakfast: "Breakfast", Lunch: "Lunch", Dinner: "Dinner", "Snack 1": "", "Snack 2": "", "Snack 3": "", } };

//TODO
// Should I have it scroll through the idsList and use startAt(index).endAt(index) instead???

class Diet extends Component {
   constructor(props) {
      super(props);

      this.state = {
         diet: JSON.parse(localStorage.getItem('diet')) || [],
         lastVisible: "",
         loading: false,
         alert: false,
         switch: false,
         error: null,
      }
   }

   onAlert = () => {
      this.setState({ alert: true });
      setTimeout(() => {
         this.setState({ alert: false });
      }, 2000);
   }

   onSave = (day) => (e) => {
      e.preventDefault();
      const { diet } = this.state;
      const { meals, key } = diet[day];
      const mealsUpdate = { ...meals };

      this.props.firebase.usersDiet(this.props.uid, key)
         .update({ meals: mealsUpdate })
         .then(this.onAlert)
         .catch(error => {
            this.setState({ error });
         });
   }

   onChange = (key) => (e) => {
      const { name, value } = e.target;
      const dietUpdate = [...this.state.diet];
      dietUpdate[key].meals[name] = value;
      this.setState({ diet: dietUpdate })
   }

   onCloseAlert = () => {
      this.setState({ alert: false });
   }

   addPreviousDate(date) {
      const oldDate = new Date(date).getTime();
      const newDiet = { ...DIETSHELL };
      newDiet["createdAt"] = oldDate;

      this.props.firebase.usersDiets(this.props.uid).push(newDiet)
         .then((snap) => {
            const key = snap.key
            this.props.firebase.usersDietIds(this.props.uid).update({ [key]: true })
         }).catch(error => {
            this.setState({ error });
         });;
   }

   addCurrentDate() {
      const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const newDiet = { ...DIETSHELL };
      newDiet["createdAt"] = timestamp;

      this.props.firebase.usersDiets(this.props.uid).push(newDiet)
         .then((snap) => {
            const key = snap.key
            this.props.firebase.usersDietIds(this.props.uid).update({ [key]: true })
         }).catch(error => {
            this.setState({ error });
         });;
   }

   loadPrevious = () => {
      this.setState({ loading: true });
      const { lastVisible } = this.state;
      this.props.firebase
         .usersDiets(this.props.uid)
         .orderByKey()
         .endAt(lastVisible)
         .limitToLast(7)
         .on("value", (snap) => {
            const dietsObject = snap.val();
            if (dietsObject) {

               const dietArray = Object.keys(dietsObject).map(key => {
                  return { ...dietsObject[key], key: key }
               }).reverse();

               // console.log(dietArray)

               const firstVisible = dietArray[0].key;
               const lastVisible = dietArray[dietArray.length - 1].key;

               this.setState({ diet: dietArray, firstVisible: firstVisible, lastVisible: lastVisible, loading: false });
            } else {
               this.setState({ diet: [], loading: false });
            }
         });
   }

   // loadRecent = () => {
   //    this.setState({ loading: true });
   //    const { lastVisible, firstVisible } = this.state;
   //    this.props.firebase
   //       .usersDiets(this.props.uid)
   //       .orderByKey()
   //       .startAt(firstVisible)
   //       // .endAt(lastVisible)
   //       .limitToFirst(7)
   //       .on("value", (snap) => {
   //          const dietsObject = snap.val();
   //          if (dietsObject) {

   //             const dietArray = Object.keys(dietsObject).map(key => {
   //                return { ...dietsObject[key], key: key }
   //             }).reverse();

   //             console.log(dietArray)

   //             const firstVisible = dietArray[0].key;
   //             const lastVisible = dietArray[dietArray.length - 1].key;

   //             this.setState({ diet: dietArray, firstVisible: firstVisible, lastVisible: lastVisible, loading: false });
   //          } else {
   //             this.setState({ diet: [], loading: false });
   //          }
   //       });
   // }

   componentDidMount() {
      this.setState({ loading: true });
      const now = new Date();
      const nowString = now.toLocaleDateString("en-US");

      // this.addPreviousDate("2/15/2020");
      // this.addCurrentDate();

      // This doesn't let you backfill older diets. And probably isn't the right way to do things...
      this.props.firebase
         .usersDiets(this.props.uid)
         .limitToLast(7)
         .on("value", (snap) => {
            const dietsObject = snap.val();
            if (dietsObject) {

               const dietArray = Object.keys(dietsObject).map(key => {
                  return { ...dietsObject[key], key: key }
               }).reverse();

               const { createdAt } = dietArray[0];
               const date = new Date(createdAt);
               const dateString = date.toLocaleDateString("en-US");

               if (nowString === dateString) {
                  console.log(dateString, nowString + " diet row already exists");
                  const firstVisible = dietArray[0].key;
                  const lastVisible = dietArray[dietArray.length - 1].key;

                  // console.log(firstVisible, lastVisible);
                  localStorage.setItem('diet', JSON.stringify(dietArray));
                  this.setState({ diet: dietArray, firstVisible: firstVisible, lastVisible: lastVisible, loading: false });

               } else if (!this.state.switch) {
                  console.log(dateString, nowString, "New day added");
                  localStorage.removeItem('diet');
                  this.setState({ loading: false, switch: true });
                  this.addCurrentDate();
               }

            } else if (!this.state.switch) {
               console.log("No diets / First Diet");
               localStorage.removeItem('diet');
               this.setState({ loading: false, switch: true });
               this.addCurrentDate();
            }
         })
   }

   componentWillUnmount() {
      // localStorage.removeItem('tasks');
      this.props.firebase.usersDiets(this.props.uid).off();
   }

   render() {
      const { diet, loading, alert, error } = this.state;
      // console.log(diet);
      const now = new Date();
      const nowString = now.toLocaleDateString("en-US");

      const idsArray = this.props.ids ? Object.keys(this.props.ids) : [];
      const dietKeysArray = diet.map(diet => diet.key);
      const lastId = dietKeysArray[dietKeysArray.length - 1];
      // const dietArray = Object.keys(diet);

      const loadMore = idsArray.indexOf(lastId) > 0 ? true : false;
      // console.log(idsArray.indexOf(lastId));

      return (
         <Card className="my-3">
            <Card.Header>
               <h3>Diet Component</h3>
            </Card.Header>
            <Card.Body>
               <ListGroup>

                  {loading && <ListGroup.Item>Loading ...</ListGroup.Item>}
                  {
                     diet.map((day, index) => {
                        const { createdAt } = diet[index];
                        const date = new Date(createdAt);
                        const dateString = date.toLocaleDateString("en-US");
                        const pastDate = nowString !== dateString;
                        // const size = pastDate ? 4 : 3;
                        const size = 12;

                        return (
                           <ListGroup.Item key={index}>
                              <Form onSubmit={this.onSave(index)}>
                                 <Form.Label>{dateString}</Form.Label>
                                 <Form.Row>
                                    <Form.Group as={Col} xs={12} md={size} key={`${index}-breakfast`} className="align-self-center">
                                       <InputGroup className="mb-3">
                                          <InputGroup.Prepend>
                                             <InputGroup.Text id={`basic-addon-meal-${index + 1}`}>Breakfast</InputGroup.Text>
                                          </InputGroup.Prepend>
                                          <Form.Control
                                             disabled={pastDate}
                                             aria-label={"Breakfast-tracking"}
                                             type="text"
                                             value={diet[index].meals["Breakfast"]}
                                             name={"Breakfast"}
                                             onChange={this.onChange(index)}
                                             aria-describedby={`basic-addon-meal-${index + 1}`}
                                          />
                                       </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} md={size} key={`${index}-lunch`} className="align-self-center">
                                       <InputGroup className="mb-3">
                                          <InputGroup.Prepend>
                                             <InputGroup.Text id={`basic-addon-meal-${index + 1}`}>Lunch</InputGroup.Text>
                                          </InputGroup.Prepend>
                                          <Form.Control
                                             disabled={pastDate}
                                             aria-label={"Lunch-tracking"}
                                             type="text"
                                             value={diet[index].meals["Lunch"]}
                                             name={"Lunch"}
                                             onChange={this.onChange(index)}
                                             aria-describedby={`basic-addon-meal-${index + 1}`}
                                          />
                                       </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} md={size} key={`${index}-Dinner`} className="align-self-center">
                                       <InputGroup className="mb-3">
                                          <InputGroup.Prepend>
                                             <InputGroup.Text id={`basic-addon-meal-${index + 1}`}>Dinner</InputGroup.Text>
                                          </InputGroup.Prepend>
                                          <Form.Control
                                             disabled={pastDate}
                                             aria-label={"Dinner-tracking"}
                                             type="text"
                                             value={diet[index].meals["Dinner"]}
                                             name={"Dinner"}
                                             onChange={this.onChange(index)}
                                             aria-describedby={`basic-addon-meal-${index + 1}`}
                                          />
                                       </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} md={size} key={`${index}-Snack-1`} className="align-self-center">
                                       <InputGroup className="mb-3">
                                          <InputGroup.Prepend>
                                             <InputGroup.Text id={`basic-addon-meal-${index + 1}`}>Snack 1</InputGroup.Text>
                                          </InputGroup.Prepend>
                                          <Form.Control
                                             disabled={pastDate}
                                             aria-label={"Snack1-tracking"}
                                             type="text"
                                             value={diet[index].meals["Snack 1"]}
                                             name={"Snack 1"}
                                             onChange={this.onChange(index)}
                                             aria-describedby={`basic-addon-meal-${index + 1}`}
                                          />
                                       </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} md={size} key={`${index}-Snack-2`} className="align-self-center">
                                       <InputGroup className="mb-3">
                                          <InputGroup.Prepend>
                                             <InputGroup.Text id={`basic-addon-meal-${index + 1}`}>Snack 2</InputGroup.Text>
                                          </InputGroup.Prepend>
                                          <Form.Control
                                             disabled={pastDate}
                                             aria-label={"Snack2-tracking"}
                                             type="text"
                                             value={diet[index].meals["Snack 2"]}
                                             name={"Snack 2"}
                                             onChange={this.onChange(index)}
                                             aria-describedby={`basic-addon-meal-${index + 1}`}
                                          />
                                       </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} md={size} key={`${index}-Snack-3`} className="align-self-center">
                                       <InputGroup className="mb-3">
                                          <InputGroup.Prepend>
                                             <InputGroup.Text id={`basic-addon-meal-${index + 1}`}>Snack 3</InputGroup.Text>
                                          </InputGroup.Prepend>
                                          <Form.Control
                                             disabled={pastDate}
                                             aria-label={"Snack3-tracking"}
                                             type="text"
                                             value={diet[index].meals["Snack 3"]}
                                             name={"Snack 3"}
                                             onChange={this.onChange(index)}
                                             aria-describedby={`basic-addon-meal-${index + 1}`}
                                          />
                                       </InputGroup>
                                    </Form.Group>

                                    {
                                       !pastDate && (
                                          <Form.Group as={Col} xs={12} md={size}>
                                             {
                                                alert
                                                   ? <Button block type="submit" className="mx-1 px-5" variant="outline-success">Saved!</Button>
                                                   : <Button block type="submit" className="mx-1 px-5" variant="outline-primary">Save</Button>
                                             }
                                          </Form.Group>
                                       )
                                    }

                                    {error && <Alert variant="warning">{error.message}</Alert>}
                                 </Form.Row>
                              </Form>
                           </ListGroup.Item>
                        )
                     })
                  }


                  {loadMore && (
                     <ListGroup.Item>
                        <Button onClick={this.loadPrevious}>Load More</Button>
                        {/* <Button onClick={this.loadRecent}>Load Less</Button> */}
                     </ListGroup.Item>
                  )}

               </ListGroup>
            </Card.Body>
         </Card>
      )
   }

}

export default withFirebase(Diet);