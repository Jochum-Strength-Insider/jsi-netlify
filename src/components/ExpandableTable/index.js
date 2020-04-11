import React from 'react';
import "./style.css"

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
      Number: "1", Description: "", Link: "", Sets: "3", Reps: "5", Tempo: "3-3-0", Rest: ":0",
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
         dayTitle: "",
         select: "end",
         alert: false,
         error: null,
         //separate into own component
         currentCell: {
            dayIndex: "day 1",
            rowIndex: 0,
            name: 'Description',
            number: "1A"
         }
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
      // console.log(day);
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

      this.resetCurrentCell(idx)();

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

   setCurrentCell = (dayIndex, rowIndex, name, number) => () => {
      this.setState({ currentCell: { dayIndex, rowIndex, name, number } })
   }

   resetCurrentCell = (dayIndex) => () => {
      const day = dayIndex + 1
      this.setState({ currentCell: { dayIndex: "day " + day, rowIndex: 0, name: "Number", number: "1A" } })
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
      const { days, show, dayTitle, alert, error, currentCell } = this.state;
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
                        const fromUserDetail = this.props.path === ROUTES.PROGRAM_DETAILS;

                        // const tasksList = Object.keys(this.props.tasks);

                        return (
                           <React.Fragment key={idx}>

                              <ListGroup.Item className="overrideBorder no-top-border" key={idx}>

                                 <span className="d-flex justify-content-between align-items-center">
                                    <CustomToggle onClick={this.resetCurrentCell(idx)} eventKey={idx} variant={"link"} size={"lg"}>{dayCapitalized}</CustomToggle>
                                    <span>
                                       <Button variant="outline-danger" onClick={this.showModal(key)}>Remove</Button>
                                    </span>
                                 </span>

                                 <Accordion.Collapse eventKey={idx}>
                                    <>
                                       <Form onSubmit={(e) => e.preventDefault()}>
                                          <Form.Group>

                                             <div className="lineContainer">
                                                <div className="cell left input-group-text">
                                                   <span>{currentCell.number}</span>
                                                   <span>{currentCell.name}</span>
                                                </div>
                                                {currentCell.name === "Description" ? (
                                                   <SearchBar
                                                      className="cell"
                                                      suggestions={this.props.tasks}
                                                      initialValue={days[currentCell.dayIndex] ? days[currentCell.dayIndex].exercises[currentCell.rowIndex]["Description"] : ""}
                                                      onChange={this.handleSearchChange(currentCell.rowIndex, currentCell.dayIndex, "Description")}
                                                   />
                                                ) : (
                                                      <Form.Control
                                                         type="text"
                                                         className="cell right"
                                                         name={currentCell.name}
                                                         value={days[currentCell.dayIndex] ? days[currentCell.dayIndex].exercises[currentCell.rowIndex][currentCell.name] : ""}
                                                         onChange={this.handleChange(currentCell.rowIndex, currentCell.dayIndex)}
                                                      />
                                                   )}
                                             </div>
                                          </Form.Group>
                                       </Form>

                                       <Table responsive bordered striped size="sm" >
                                          <thead>
                                             <tr style={{ position: "relative" }}>
                                                <th className="text-center  dth-number">#</th>
                                                <th className="text-center  dth-description">Description</th>
                                                <th className="text-center  dth-link">Link</th>
                                                <th className="text-center  dth-sets">Sets</th>
                                                <th className="text-center  dth-reps">Reps</th>
                                                <th className="text-center  dth-tempo">Tempo</th>
                                                <th className="text-center  dth-rest">Rest</th>
                                                {fromUserDetail && (
                                                   <>
                                                      <th className="text-center  dth-w1">w1</th>
                                                      <th className="text-center  dth-w2">w2</th>
                                                      <th className="text-center  dth-w3">w3</th>
                                                   </>
                                                )
                                                }

                                                <th className="text-center  dth-btn">x</th>
                                             </tr>
                                          </thead>

                                          <tbody>
                                             {dayRows.map((item, rowIndex) => (
                                                <tr id="addr0" key={rowIndex}>
                                                   <td>
                                                      <input
                                                         type="text"
                                                         name="Number"
                                                         value={item["Number"]}
                                                         onChange={this.handleChange(rowIndex, key)}
                                                         onClick={this.setCurrentCell(key, rowIndex, "Number", item["Number"])}
                                                         className="data-grid-control"
                                                      />
                                                   </td>
                                                   <td className="data-grid-control" onClick={this.setCurrentCell(key, rowIndex, "Description", item["Number"])}>
                                                      <SearchBar suggestions={this.props.tasks} initialValue={item["Description"]} onChange={this.handleSearchChange(rowIndex, key, "Description")} />
                                                   </td>
                                                   <td>
                                                      <input
                                                         type="text"
                                                         name="Link"
                                                         value={item["Link"]}
                                                         onChange={this.handleChange(rowIndex, key)}
                                                         onClick={this.setCurrentCell(key, rowIndex, "Link", item["Number"])}
                                                         className="data-grid-control"
                                                      />
                                                   </td>
                                                   <td>
                                                      <input
                                                         type="text"
                                                         name="Sets"
                                                         value={item["Sets"]}
                                                         onChange={this.handleChange(rowIndex, key)}
                                                         onClick={this.setCurrentCell(key, rowIndex, "Sets", item["Number"])}
                                                         className="data-grid-control"
                                                      />
                                                   </td>
                                                   <td>
                                                      <input
                                                         type="text"
                                                         name="Reps"
                                                         value={item["Reps"]}
                                                         onChange={this.handleChange(rowIndex, key)}
                                                         onClick={this.setCurrentCell(key, rowIndex, "Reps", item["Number"])}

                                                         className="data-grid-control"
                                                      />
                                                   </td>
                                                   <td>
                                                      <input
                                                         type="text"
                                                         name="Tempo"
                                                         value={item["Tempo"]}
                                                         onChange={this.handleChange(rowIndex, key)}
                                                         onClick={this.setCurrentCell(key, rowIndex, "Tempo", item["Number"])}

                                                         className="data-grid-control"
                                                      />
                                                   </td>
                                                   <td>
                                                      <input
                                                         type="text"
                                                         name="Rest"
                                                         value={item["Rest"]}
                                                         onChange={this.handleChange(rowIndex, key)}
                                                         onClick={this.setCurrentCell(key, rowIndex, "Rest", item["Number"])}
                                                         className="data-grid-control"
                                                      />
                                                   </td>

                                                   {fromUserDetail && (
                                                      <>
                                                         <td className="vertical-align-center">
                                                            {item["tracking"]["week 1"]}
                                                         </td>
                                                         <td className="vertical-align-center">
                                                            {item["tracking"]["week 2"]}
                                                         </td>
                                                         <td className="vertical-align-center">
                                                            {item["tracking"]["week 3"]}
                                                         </td>
                                                      </>
                                                   )
                                                   }

                                                   <td className="vertical-align-center">
                                                      <Button
                                                         variant={"outline-danger"}
                                                         onClick={this.handleRemoveSpecificRow(rowIndex, key)}
                                                      >
                                                         x
                                             </Button>
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