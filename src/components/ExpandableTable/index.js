import React from 'react';
import "./style.css"

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

const TASKSHELL = {
   instruction: {
      Number: "1", Description: "", Link: "", Sets: "3", Reps: "5", Tempo: "3-3-0", Rest: ":0",
      tracking: { "week 1": "", "week 2": "", "week 3": "" }
   }, title: "Default"
}

class ExpandableTable extends React.Component {
   constructor(props) {
      super(props);

      this.timer = null;
      const defaultDays = this.props.days ? this.props.days : [];

      this.state = {
         expanded: true,
         days: defaultDays,
         // Should completed be here?
         completed: props.completed || false,
         showEdit: false,
         showAdd: false,
         showRemove: false,
         modalNumber: null,
         dayTitle: "",
         select: "end",
         selectImage: "max-upper",
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
      this.timer = setTimeout(() => {
         this.setState({ alert: false });
      }, 2000);
   }

   handleChange = (idx, day) => e => {
      const { name, value } = e.target;
      const days = { ...this.state.days };
      days[day].exercises[idx][name] = value;
      this.setState({ days });
   };

   handleSearchChange = (idx, day, name) => (value, link = false) => {
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

   showRemoveModal = (key) => () => {
      this.setState({ modalNumber: key, showRemove: true });
   }

   showAddModal = () => {
      this.setState({ showAdd: true, dayTitle: "", selectImage: "max-upper" });
   }

   showEditModal = (key, idx) => () => {
      const dayTitle = this.state.days[key].title;
      const dayImage = this.state.days[key].image;
      this.setState({ modalNumber: key, dayTitle: dayTitle, showEdit: true, selectImage: dayImage });
   }

   hideModal = show => () => {
      this.setState({ [show]: false });
   }

   handleSave = () => {
      const { days, completed } = this.state;
      const { phase } = this.props;

      const daysListJSON = Object.keys(days).reduce((accumulator, key) => {
         const { title, exercises, image } = days[key];
         const day = {
            image,
            title,
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

      console.log("updating program");

      this.props.onSave(phase, phaseUpdate)
         .then(this.onAlert)
         .catch(error => this.setState({ error }));
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

      this.resetCurrentCell(idx);

      if (exercises.length > 1) {
         exercises.splice(idx, 1);
         days[key].exercises = exercises;
         this.setState({ days });
      } else {
         console.log("Can't remove more rows");
      }
   }

   removeDay = (day) => () => {
      const { days } = this.state;
      const daysUpdate = { ...days };
      delete daysUpdate[day]
      this.setState({ days: daysUpdate, select: "end" }, this.hideModal("showRemove"));
   }

   handleSelect = (e) => {
      const index = e.target.value;
      this.setState({ select: index })
   }

   handleSelectImage = (e) => {
      const index = e.target.value;
      this.setState({ selectImage: index })
   }

   setCurrentCell = (dayIndex, rowIndex, name, number) => () => {
      this.setState({ currentCell: { dayIndex, rowIndex, name, number } })
   }

   resetCurrentCell = (dayIndex) => {
      const day = dayIndex + 1
      this.setState({ currentCell: { dayIndex: "day " + day, rowIndex: 0, name: "Number", number: "1A" } })
   }

   handleAddDay = (e) => {
      e.preventDefault();
      const { days, dayTitle, selectImage } = this.state;

      const daysUpdate = { ...days };

      const location = "day " + (Object.keys(daysUpdate).length + 1);
      daysUpdate[location] = {
         exercises: JSON.parse(INITIALJSON),
         title: dayTitle,
         image: selectImage
      };
      this.setState({ days: daysUpdate }, this.hideModal("showAdd"));
   }

   handleChangeDayTitle = (e) => {
      e.preventDefault();
      const { days, modalNumber, dayTitle, selectImage } = this.state;
      const daysUpdate = { ...days };
      const dayUpdate = { ...daysUpdate[modalNumber] };
      dayUpdate["title"] = dayTitle;
      dayUpdate["image"] = selectImage;
      daysUpdate[modalNumber] = dayUpdate;
      this.setState({ days: daysUpdate }, this.hideModal("showEdit"));
   }

   componentWillUnmount() {
      clearTimeout(this.timer);
   }

   render() {
      const { days, showAdd, showEdit, showRemove, dayTitle, alert, error, currentCell, modalNumber } = this.state;
      const { showTracking } = this.props;
      // const { days, completed, show, dayTitle } = this.state;
      // const completeColor = (completed === "true") ? "green" : "black";
      // const { phase } = this.props;
      const daysList = Object.keys(days);

      return (
         <>
            <Modal show={showRemove} handleClose={this.hideModal("showRemove")} heading={"Remove " + modalNumber + "?"}>
               <Form className="d-flex justify-content-between align-items-center">
                  <Button variant="outline-danger" onClick={this.removeDay(modalNumber)}>Remove</Button>
                  <Button variant="primary" onClick={this.hideModal("showRemove")}>Cancel</Button>
               </Form>
            </Modal>

            <Modal show={showAdd} handleClose={this.hideModal("showAdd")} heading={"Add Day"}>
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
                  <Form.Group>
                     <Form.Label>Day Image</Form.Label>
                     <Form.Control as="select" value={this.state.selectImage} onChange={this.handleSelectImage}>
                        <option value={"max-upper"}>Max Upper</option>
                        <option value={"max-lower"}>Max Lower</option>
                        <option value={"dynamic-upper"}>Dynamic Upper</option>
                        <option value={"dynamic-lower"}>Dynamic Lower</option>
                        <option value={"hypertrophy-upper"}>Hypertrophy Upper</option>
                        <option value={"hypertrophy-lower"}>Hypertrophy Lower</option>
                        <option value={"full-1"}>Full Body 1</option>
                        <option value={"full-2"}>Full Body 2</option>
                        <option value={"full-3"}>Full Body 3</option>
                        <option value={"full-4"}>Full Body 4</option>
                        <option value={"recovery-1"}>Recovery 1</option>
                        <option value={"recovery-2"}>Recovery 2</option>
                        <option value={"recovery-3"}>Recovery 3</option>
                        <option value={"rest"}>Rest</option>
                     </Form.Control>
                  </Form.Group>
                  <Button type="submit">Add Day</Button>
               </Form>
            </Modal>

            <Modal show={showEdit} handleClose={this.hideModal("showEdit")} heading={"Edit " + modalNumber + "?"}>
               <Form onSubmit={(e) => this.handleChangeDayTitle(e)}>
                  <Form.Group>
                     <Form.Label>Day Title</Form.Label>
                     <Form.Control
                        type="text"
                        onChange={this.handleSetDayTitle}
                        value={dayTitle}
                        name={"dayTitle"}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Day Image</Form.Label>
                     <Form.Control as="select" value={this.state.selectImage} onChange={this.handleSelectImage}>
                        <option value={"max-upper"}>Max Upper</option>
                        <option value={"max-lower"}>Max Lower</option>
                        <option value={"dynamic-upper"}>Dynamic Upper</option>
                        <option value={"dynamic-lower"}>Dynamic Lower</option>
                        <option value={"hypertrophy-upper"}>Hypertrophy Upper</option>
                        <option value={"hypertrophy-lower"}>Hypertrophy Lower</option>
                        <option value={"full-1"}>Full Body 1</option>
                        <option value={"full-2"}>Full Body 2</option>
                        <option value={"full-3"}>Full Body 3</option>
                        <option value={"full-4"}>Full Body 4</option>
                        <option value={"recovery-1"}>Recovery 1</option>
                        <option value={"recovery-2"}>Recovery 2</option>
                        <option value={"recovery-3"}>Recovery 3</option>
                        <option value={"rest"}>Rest</option>
                     </Form.Control>
                  </Form.Group>
                  <Button type="submit">Edit {modalNumber}</Button>
               </Form>
            </Modal>

            {error && <Alert variant="modal">{error.message}</Alert>}

            <ListGroup className="pb-5">
               <Accordion defaultActiveKey={0}>
                  <>
                     {daysList.map((key, idx) => {

                        const dayRows = days[key].exercises;
                        const title = days[key].title;
                        const dayCapitalized = key.charAt(0).toUpperCase() + key.substring(1) + ": " + title;

                        return (
                           <React.Fragment key={idx}>

                              <ListGroup.Item className="overrideBorder no-top-border" key={idx}>
                                 <CustomToggle eventKey={idx} variant={"link"} size={"lg"} scroll={false}><Button onClick={() => this.resetCurrentCell(idx)} style={{ fontSize: "1.25rem" }} variant="link">{dayCapitalized}</Button></CustomToggle>
                                 <Accordion.Collapse eventKey={idx}>
                                    <>
                                       {/* Give an edit button that has edit title and delete? */}
                                       <span className="d-flex justify-content-between align-items-center pb-3">
                                          <Button variant="outline-warning mx-3" onClick={this.showEditModal(key, idx)}>Edit Title</Button>
                                          <Button variant="outline-danger" onClick={this.showRemoveModal(key)}>Remove</Button>
                                       </span>

                                       <EditCellForm
                                          value={days[currentCell.dayIndex] ? days[currentCell.dayIndex].exercises[currentCell.rowIndex][currentCell.name] : ""}
                                          tasks={this.props.tasks}
                                          dayIndex={currentCell.dayIndex}
                                          rowIndex={currentCell.rowIndex}
                                          name={currentCell.name}
                                          number={currentCell.number}
                                          handleChange={this.handleChange(currentCell.rowIndex, currentCell.dayIndex)}
                                          handleSearchChange={this.handleSearchChange(currentCell.rowIndex, currentCell.dayIndex, "Description")}
                                       />

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
                                                {showTracking && (
                                                   <>
                                                      <th className="text-center  dth-w1">w1</th>
                                                      <th className="text-center  dth-w2">w2</th>
                                                      <th className="text-center  dth-w3">w3</th>
                                                   </>
                                                )
                                                }

                                                <th className="text-center  dth-btn"><span role="img" aria-label='Delete'>&#10060;</span></th>
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

                                                   {showTracking && (
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
                                                         &#215;
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
                           <Button size="lg" variant="link" onClick={this.showAddModal}>Add Day</Button>
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


const EditCellForm = ({ value, tasks, name, number, handleChange, handleSearchChange }) => {
   return (
      <div>
         <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group>
               <div className="lineContainer">
                  <div className="cell left input-group-text">
                     <span>{number}</span>
                     <span>{name}</span>
                  </div>
                  {name === "Description" ? (
                     <SearchBar
                        className="cell"
                        suggestions={tasks}
                        initialValue={value}
                        onChange={handleSearchChange}
                     />
                  ) : (
                        <Form.Control
                           type="text"
                           className="cell right"
                           name={name}
                           value={value}
                           onChange={handleChange}
                        />
                     )}
               </div>
            </Form.Group>
         </Form>
      </div>
   )
}

export default ExpandableTable;