import React, { Component } from "react";

import moment from 'moment';

import { withFirebase } from '../../Firebase';
import Modal from '../../Modal';

import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { PROGRAM } from '../../../constants/defaultProgram';
import HoverButton from '../../HoverButton';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class WorkoutListBase extends Component {
   constructor(props) {
      super(props);

      this.timestamp = Number(moment().format("x"));

      this.state = {
         loading: false,
         workoutids: [],
         programIds: { "default": { title: "default", createdAt: this.timestamp } },
         program: PROGRAM(this.timestamp),
         user: null,
         show: false,
         programTitle: "New Program",
         removeKey: null,
         showRemove: false,
         error: null,
         quickSave: null,
         ...props.location.state,
      };
   }

   handleCreateWorkoutFromTemplate = (e) => {
      e.preventDefault();

      const currentUserId = this.props.uid;

      const programUpdate = { ...this.state.program };
      programUpdate["createdAt"] = this.timestamp;

      console.log("creating new workout from template");

      // console.log(programUpdate, timestamp);

      this.props.firebase.workouts(currentUserId).push(programUpdate)
         .then((snap) => {
            const key = snap.key;
            // const title = this.state.programIds[key].title;
            // console.log(this.state.programIds);

            this.props.firebase.workoutIds(currentUserId).update({ [key]: { title: programUpdate.title, createdAt: this.timestamp, active: false } });
            this.props.firebase.user(currentUserId).update({ programDate: this.timestamp });
            // this.props.history.push(`/admin-user-programs/${currentUserId}/${key}`);
         })
         .catch(error => this.setState({ error }));
   }

   handleCreateWorkoutFromQuickSave = (e) => {
      e.preventDefault();

      const currentUserId = this.props.uid;

      this.props.firebase
         .quickSave()
         .once('value', snapshot => {
            const quickSaveObject = snapshot.val()

            if (quickSaveObject) {
               const programUpdate = { ...quickSaveObject };
               programUpdate["createdAt"] = this.timestamp;

               console.log("creating new workout from quick save");

               this.props.firebase.workouts(currentUserId).push(programUpdate)
                  .then((snap) => {
                     const key = snap.key;
                     this.props.firebase.workoutIds(currentUserId).update({ [key]: { title: programUpdate.title, createdAt: programUpdate.createdAt, active: false } });
                     this.props.firebase.user(currentUserId).update({ programDate: programUpdate.createdAt });
                  })
                  .catch(error => this.setState({ error }));
            }
         });


   }

   handleCreateNewWorkout = (e) => {
      e.preventDefault();
      // const currentUserId = this.state.user.uid;
      const currentUserId = this.props.uid;

      // const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const programData = PROGRAM(this.timestamp);
      programData["title"] = this.state.programTitle;

      console.log("creating new workout");

      this.props.firebase.workouts(currentUserId).push(programData)
         .then((snap) => {
            const key = snap.key;
            this.props.firebase.workoutIds(currentUserId).update({ [key]: { title: programData.title, createdAt: this.timestamp, active: false } });
            this.props.firebase.user(currentUserId).update({ programDate: this.timestamp });
            // this.props.history.push(`/admin-user-programs/${currentUserId}/${key}`);
            this.handleClose();
         })
         .catch(error => this.setState({ error }));
   }

   handleOpen = () => {
      this.setState({ show: true })
   }

   handleClose = () => {
      this.setState({ show: false })
   }

   setRemoveKey = (key) => {
      this.setState({ removeKey: key, showRemove: true })
   }

   handleRemoveClose = () => {
      this.setState({ removeKey: null, showRemove: false })
   }

   handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value })
   }

   handleSelect = (e) => {
      const key = e.target.value;
      // console.log(key);
      this.props.firebase.program(key).once("value").then((snap) => {
         const programObject = snap.val();

         if (programObject) {
            this.setState({ program: programObject });
         }
      })
   }

   setActive = (wid) => () => {
      // const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      // console.log(wid, "setActive");
      const workoutidsArray = Object.keys(this.state.workoutids);
      workoutidsArray.forEach(each => {
         this.props.firebase.workoutId(this.props.uid, each).update({ active: false });
      })

      this.props.firebase.workoutId(this.props.uid, wid).update({ active: true });
      this.props.firebase.user(this.props.uid).update({ programDate: this.timestamp });
   };

   setInactive = (wid) => () => {
      // console.log(wid, "setInactive");
      this.props.firebase.workoutId(this.props.uid, wid).update({ active: false });
      this.props.firebase.user(this.props.uid).update({ programDate: null });
   };

   fetchPrograms = () => {
      // there might be a leak here
      this.props.firebase
         .programIds()
         .on('value', snapshot => {
            const idsObject = snapshot.val()
            if (idsObject) {
               const programId = Object.keys(idsObject)[0];
               this.props.firebase.program(programId).once("value").then((snap) => {
                  const programObject = snap.val();
                  if (programObject) {
                     this.setState({ program: programObject });
                  }
               })
               this.setState({
                  programIds: idsObject,
               });
            }
         });
   }

   fetchQuickSave = () => {
      this.props.firebase
         .quickSaveId()
         .once('value', snapshot => {
            const quickSaveObject = snapshot.val()

            if (quickSaveObject) {
               this.setState({
                  quickSave: quickSaveObject,
               });
            }
         });
   }


   fetchUserIds = () => {
      this.setState({ loading: true });

      this.props.firebase
         .workoutIds(this.props.uid)
         .on('value', snapshot => {
            const workoutIdsObject = snapshot.val();
            if (workoutIdsObject) {
               // const idsArray = Object.keys(workoutsObject);
               this.setState({
                  workoutids: workoutIdsObject,
                  loading: false,
               });
            } else {
               this.setState({ workoutids: [], loading: false, })
            }
         });
   }

   // componentDidUpdate(prevProps) {
   //    if (this.props.uid !== prevProps.uid) {
   //       this.props.firebase.user(prevProps.uid).off();
   //       this.fetchUser();
   //    }
   // }

   componentDidMount() {
      // console.log("mount");
      this.fetchUserIds();
      this.fetchPrograms();
      this.fetchQuickSave();
   }

   onRemoveWorkout = () => {
      const wid = this.state.removeKey;
      this.props.firebase.workout(this.props.uid, wid).remove();
      this.props.firebase.workoutId(this.props.uid, wid).remove();
      this.handleRemoveClose();
   }

   componentWillUnmount() {
      this.props.firebase.user(this.props.uid).off();
      this.props.firebase.workoutIds(this.props.uid).off();
      this.props.firebase.programIds().off();
   }

   render() {
      const { user, loading, workoutids, show, programIds, error, quickSave } = this.state;
      const workoutidsArray = Object.keys(workoutids).reverse();

      return (
         <div>
            {error && <Alert>{error.message}</Alert>}

            <div>
               <Modal handleClose={this.handleRemoveClose} show={this.state.showRemove} heading={"Remove Program?"}>
                  <Form className="d-flex justify-content-between align-items-center">
                     <Button variant="outline-danger" onClick={this.onRemoveWorkout}>Remove</Button>
                     <Button variant="primary" onClick={this.handleRemoveClose}>Cancel</Button>
                  </Form>
               </Modal>

               <Modal handleClose={this.handleClose} show={show} heading={"Create New Workout"}>
                  <Form onSubmit={this.handleCreateNewWorkout}>
                     <Form.Group>
                        <Form.Label>Program Title</Form.Label>
                        <Form.Control
                           type="text"
                           name="programTitle"
                           onChange={this.handleChange}
                           value={this.state.programTitle}
                        />
                     </Form.Group>
                     <Button type="submit">Add New Workout</Button>
                  </Form>

                  <hr></hr>

                  <Form onSubmit={this.handleCreateWorkoutFromTemplate}>
                     <Form.Group>
                        <Form.Label>Program List</Form.Label>
                        <Form.Control as="select" name="task" defaultValue="task" onChange={this.handleSelect}>
                           {Object.keys(programIds).map((key, idx) => {

                              return (
                                 <option
                                    key={idx}
                                    value={key}
                                 >
                                    {programIds[key].title}
                                 </option>
                              )
                           })}
                        </Form.Control>
                     </Form.Group>
                     <Button type="submit">Add From Template</Button>
                  </Form>
                  {
                     quickSave && (
                        <>
                           <hr></hr>
                           <Form onSubmit={this.handleCreateWorkoutFromQuickSave}>
                              <Form.Group>
                                 <Form.Label>Quick Save Program</Form.Label>
                                 <Form.Control type="text" placeholder={quickSave.title} readOnly />
                              </Form.Group>
                              <Button type="submit">Add From Quick Save</Button>
                           </Form>
                        </>
                     )
                  }
               </Modal>

               <ListGroup className="mb-5">
                  <ListGroup.Item className="no-top-border">
                     <Button block onClick={this.handleOpen}>Add Program</Button>
                  </ListGroup.Item>

                  {
                     loading && (
                        <ListGroup.Item className="no-top-border">
                           Loading...
                        </ListGroup.Item>)
                  }

                  {
                     (workoutidsArray.length > 0)
                        ?
                        (
                           workoutidsArray.map((workoutId, index) => {

                              const date = new Date(workoutids[workoutId].createdAt);
                              const dateString = date.toLocaleDateString("en-US");

                              return (

                                 <ListGroup.Item key={index}>
                                    <>
                                       <Row className="d-flex justify-content-between align-items-center">
                                          <Col xs={12} md={6}>
                                             <Link
                                                className="btn btn-link px-0"
                                                to={{
                                                   pathname: `${ROUTES.WORKOUTS}/${this.props.uid}/${workoutId}`,
                                                   state: { user, workoutids },
                                                }}
                                             >
                                                {workoutids[workoutId].title}
                                             </Link>
                                          </Col>

                                          <Col xs={12} md={2}><p className="my-0">{dateString}</p></Col>

                                          <Col xs={12} className="d-md-none">
                                             <hr />
                                          </Col>

                                          <Col xs={12} md={4} className="d-flex justify-content-end">

                                             {!workoutids[workoutId].active
                                                ? <HoverButton variant={"outline-warning"} text={"Inactive"} hoveredText={"Activate"} onClick={this.setActive(workoutId)} />
                                                : <HoverButton variant={"outline-success"} text={"Active"} hoveredText={"Deactivate"} onClick={this.setInactive(workoutId)} />
                                             }

                                             <Button className="ml-3" variant="outline-danger"
                                                type="button"
                                                onClick={() => this.setRemoveKey(workoutId)}
                                             >
                                                X
                                                </Button>
                                          </Col>

                                       </Row>
                                    </>
                                 </ListGroup.Item>
                              )
                           }
                           )
                        ) : (
                           <ListGroup.Item>No Workouts ...</ListGroup.Item>
                        )
                  }
               </ListGroup>
            </div>
         </div>
      );
   }
}

const WorkoutList = withRouter(withFirebase(WorkoutListBase));

export default WorkoutList;