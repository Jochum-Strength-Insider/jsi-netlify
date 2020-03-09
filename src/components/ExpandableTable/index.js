import React from 'react';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { INITIALJSON } from '../../constants/defaultProgram';
import Modal from '../Modal';

import SearchBar from '../SearchBar';
import CustomToggle from '../CustomToggle';

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';


// ToDo

// Are these technically out of sync?
// json / keys toLowerCase on submission. Capitalize first letter on display.
// handleSave has a similar problem but it isn't as apparent because the state of each day is already store to state.
// Should I save state on the component and then update the firebase store?
// Restyle so text is smaller

const TASKSHELL = {
   instruction: {
      Number: "1", Description: "Monster Walks", Link: "https://www.youtube.com", Sets: "3", Reps: "5", Tempo: "3-3-0", Rest: ":0",
      tracking: { "week 1": "", "week 2": "", "week 3": "" }
   }, title: "Default"
}

class ExpandableTable extends React.Component {
   constructor(props) {
      super(props);

      const defaultDays = this.props.days ? this.props.days : [];

      this.state = {
         expanded: true,
         days: defaultDays,
         // Should completed be here?
         completed: props.completed || false,
         show: false,
         modalNumber: "day",
         dayTitle: "Max Effort Day",
         select: "end",
         alert: false,
         error: null,
      }
   }

   onAlert = () => {
      this.setState({ alert: true });
      setTimeout(() => {
         this.setState({ alert: false });
      }, 2000);
   }

   handleChange = (idx, day) => e => {
      const { name, value } = e.target;
      // console.log(day, idx, name, value);
      const days = { ...this.state.days };
      days[day].exercises[idx][name] = value;
      this.setState({ days });
   };

   handleSearchChange = (idx, day, name) => (value, link = false) => {
      // const { name, value } = e.target;
      // console.log(day, idx, name, value);
      const days = { ...this.state.days };
      days[day].exercises[idx][name] = value;
      if (link) {
         days[day].exercises[idx].Link = link;
      }

      this.setState({ days });
   };

   handleSetDayTitle = (e) => {
      const dayTitle = e.target.value;
      this.setState({ dayTitle: dayTitle });
   }

   showModal = (key) => () => {
      this.setState({ modalNumber: key, show: true });
   }

   hideModal = () => {
      this.setState({ show: false });
   }

   handleSave = () => {
      const { firebase } = this.props;
      const { days, completed } = this.state;
      const { pid, uid, phase } = this.props;

      console.log("updating program", pid, phase);

      const daysListJSON = Object.keys(days).reduce((accumulator, key) => {

         const { title, exercises } = days[key];

         const day = {
            title: title,
            exercises: JSON.stringify(exercises)
         };

         return (
            { ...accumulator, [key]: day }
         )
      }, {});

      const phaseUpdate = {
         completed: completed,
         ...daysListJSON
      }

      // console.log(phaseUpdate);

      if (this.props.path === ROUTES.CREATE_DETAILS) {
         firebase
            .program(pid)
            .child("instruction")
            .child(phase)
            .set(phaseUpdate)
            .then(this.onAlert)
            .catch(error => this.setState({ error }));
      }
      if (this.props.path === ROUTES.PROGRAM_DETAILS) {
         firebase
            .workouts(uid)
            .child(pid)
            .child("instruction")
            .child(phase)
            .set(phaseUpdate)
            .then(this.onAlert)
            .catch(error => this.setState({ error }));
      }
   }

   togglePanel = () => {
      this.setState(state => ({ expanded: !state.expanded }))
   }

   handleAddRow = (key) => e => {
      e.preventDefault();
      const index = this.state.select;
      const days = { ...this.state.days };

      const { instruction } = TASKSHELL;

      const headers = Object.keys(instruction);
      const items = headers.reduce(((accumulator, header) => { return { ...accumulator, [header]: instruction[header] } }), {});

      if (index === "end") {
         days[key].exercises.push(items);
      } else {
         days[key].exercises.splice(index, 0, items);
      }

      // days[key] = newDaysTable;
      this.setState({ days: days, select: "end" })
   };

   handleRemoveSpecificRow = (idx, key) => () => {
      const days = { ...this.state.days };
      // const dayArray = [...days[key]];
      const { exercises } = days[key];

      if (exercises.length > 1) {
         exercises.splice(idx, 1);
         days[key].exercises = exercises;
         // console.log("daysObject", days);
         this.setState({ days });
      } else {
         console.log("Can't remove more rows");
      }
   }

   removeDay = (day) => () => {
      const { days } = this.state;

      const daysUpdate = { ...days };
      delete daysUpdate[day]
      // console.log(daysUpdate);

      this.setState({ days: daysUpdate });
      this.hideModal();
   }

   handleSelect = (e) => {
      const index = e.target.value;
      // const currentTask = this.props.tasks[index];
      // this.setState({ currentTask: currentTask });
      this.setState({ select: index })
   }

   handleAddDay = (e) => {
      e.preventDefault();
      const { days, dayTitle } = this.state;

      const daysUpdate = { ...days };

      // console.log(Object.keys(daysUpdate).length);
      const location = "day " + (Object.keys(daysUpdate).length + 1);
      daysUpdate[location] = {
         exercises: JSON.parse(INITIALJSON),
         title: dayTitle,
      };

      this.setState({ days: daysUpdate });
      this.hideModal();
   }

   render() {
      const { days, show, dayTitle, alert, error } = this.state;
      // const { days, completed, show, dayTitle } = this.state;
      // const completeColor = (completed === "true") ? "green" : "black";
      // const { phase } = this.props;
      const daysList = Object.keys(days);

      let modalForm;
      if (this.state.modalNumber === "day") {
         modalForm = (
            <Modal show={show} handleClose={this.hideModal} heading={"Add Day"}>

               <Form onSubmit={this.handleAddDay}>
                  <Form.Group>
                     <Form.Label>Day Title</Form.Label>
                     <Form.Control
                        type="text"
                        onChange={this.handleSetDayTitle}
                        value={dayTitle}
                        name={"dayTitle"}
                     />
                  </Form.Group>

                  <Button type="submit">Add Day</Button>
               </Form>
            </Modal>
         )
      } else {
         const key = this.state.modalNumber;
         // console.log(key);
         modalForm = (
            <Modal show={show} handleClose={this.hideModal} heading={"Remove " + key + "?"}>
               <Form className="d-flex justify-content-between align-items-center">
                  <Button variant="outline-danger" onClick={this.removeDay(key)}>Remove</Button>
                  <Button variant="primary" onClick={this.hideModal}>Cancel</Button>
               </Form>
            </Modal>
         )
      }

      return (
         <>
            {modalForm}

            {error && <Alert variant="modal">{error.message}</Alert>}

            <ListGroup className="pb-5">
               <Accordion defaultActiveKey={0}>
                  <>
                     {daysList.map((key, idx) => {
                        // Need to remove tracking from the headers array.
                        const headers = Object.keys(days[key].exercises[0]);

                        // remove the last object from the headers array. In this case "tracking".
                        headers.pop();

                        const dayRows = days[key].exercises;
                        const title = days[key].title;
                        const dayCapitalized = key.charAt(0).toUpperCase() + key.substring(1) + ": " + title;
                        // const tasksList = Object.keys(this.props.tasks);

                        return (

                           <React.Fragment key={idx}>

                              <ListGroup.Item className="overrideBorder no-top-border" key={idx}>

                                 <span className="d-flex justify-content-between align-items-center">
                                    <CustomToggle eventKey={idx}>{dayCapitalized}</CustomToggle>
                                    <span>
                                       <Button variant="outline-danger" onClick={this.showModal(key)}>Remove</Button>
                                    </span>
                                 </span>

                                 <Accordion.Collapse eventKey={idx}>
                                    <>
                                       <Table responsive striped hover size="sm" borderless>
                                          <thead>
                                             <tr>
                                                {headers.map(header => {
                                                   if (header === "Number") {
                                                      return <th style={{ width: "3rem" }} className="text-center" key={header}>#</th>
                                                   } else {
                                                      return <th className="text-center" key={header}>{header}</th>
                                                   }
                                                })}
                                                <th className="text-center">x</th>
                                             </tr>
                                          </thead>

                                          <tbody>
                                             {dayRows.map((item, rowIndex) => (

                                                <tr id="addr0" key={rowIndex}>

                                                   {
                                                      headers.map((header, idx) => {
                                                         if (header === "Description") {
                                                            return (
                                                               <td key={`${header}-${idx}`}>
                                                                  <SearchBar suggestions={this.props.tasks} initialValue={item[header]} onChange={this.handleSearchChange(rowIndex, key, header)} />
                                                               </td>
                                                            )
                                                         } else if (header === "Number" || header === "Sets") {
                                                            return (
                                                               <td key={`${header}-${idx}`}>
                                                                  <input
                                                                     style={{ width: "3rem" }}
                                                                     type="text"
                                                                     name={header}
                                                                     value={item[header]}
                                                                     onChange={this.handleChange(rowIndex, key)}
                                                                     className="form-control"
                                                                  />
                                                               </td>
                                                            )
                                                         } else if (header === "Rest") {
                                                            return (
                                                               <td key={`${header}-${idx}`}>
                                                                  <input
                                                                     style={{ width: "4rem" }}
                                                                     type="text"
                                                                     name={header}
                                                                     value={item[header]}
                                                                     onChange={this.handleChange(rowIndex, key)}
                                                                     className="form-control"
                                                                  />
                                                               </td>
                                                            )
                                                         } else {
                                                            return (
                                                               <td key={`${header}-${idx}`}>
                                                                  <input
                                                                     type="text"
                                                                     name={header}
                                                                     value={item[header]}
                                                                     onChange={this.handleChange(rowIndex, key)}
                                                                     className="form-control"
                                                                  />
                                                               </td>
                                                            )
                                                         }
                                                      })
                                                   }

                                                   <td>
                                                      <button
                                                         className="btn btn-outline-danger btn-sm"
                                                         onClick={this.handleRemoveSpecificRow(rowIndex, key)}
                                                      >
                                                         x
                                             </button>
                                                   </td>
                                                </tr>
                                             ))}
                                          </tbody>

                                       </Table>

                                       <Form onSubmit={this.handleAddRow(key)}>
                                          <Form.Group>
                                             <Form.Label>Add Row at Index</Form.Label>
                                             <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                   <Button type="submit" className="px-5" variant="outline-secondary">Add</Button>
                                                </InputGroup.Prepend>
                                                <Form.Control as="select" value={this.state.select} onChange={this.handleSelect}>
                                                   {
                                                      dayRows.map((row, index) => <option key={index} value={index}>{index}</option>)
                                                   }
                                                   <option value={"end"}>End of Table</option>
                                                </Form.Control>
                                             </InputGroup>
                                          </Form.Group>
                                       </Form>

                                    </>
                                 </Accordion.Collapse>
                              </ListGroup.Item>

                           </React.Fragment>
                        )
                     }

                     )
                     }
                     <ListGroup.Item>
                        <Form className="d-flex justify-content align-items-center">
                           <Button size="lg" variant="link" onClick={this.showModal("day")} >Add Day</Button>
                        </Form>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Form>
                           <Form.Group controlId="exampleForm.ControlSelect2">
                              <Form.Label>Save {this.props.phase}</Form.Label>
                              {
                                 alert
                                    ? <Button className="mr-5" onClick={this.handleSave} variant="outline-success" block>Saved!</Button>
                                    : <Button className="mr-5" onClick={this.handleSave} variant="outline-primary" block>Save</Button>
                              }
                           </Form.Group>
                        </Form>
                     </ListGroup.Item>
                  </>
               </Accordion>
            </ListGroup>
         </>
      )
   }
}

export default withFirebase(ExpandableTable);