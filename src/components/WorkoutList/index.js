import React, { Component } from "react";

import moment from 'moment';

import { withFirebase } from '../Firebase';
import Modal from '../Modal';

import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { PROGRAM } from '../../constants/defaultProgram';
import HoverButton from '../HoverButton';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

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
         ...props.location.state,
      };
   }

   handleCreateWorkoutFromTemplate = (e) => {
      e.preventDefault();

      // const currentUserId = this.state.user.uid;
      const currentUserId = this.props.match.params.id;
      // console.log(this.props.match.params.id);

      // const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const programUpdate = { ...this.state.program };
      programUpdate["createdAt"] = this.timestamp;

      // console.log("program", this.state.program);
      console.log("creating new workout from template");

      // console.log(programUpdate, timestamp);

      this.props.firebase.workouts(currentUserId).push(programUpdate)
         .then((snap) => {
            const key = snap.key;
            // const title = this.state.programIds[key].title;
            // console.log(this.state.programIds);

            this.props.firebase.workoutIds(currentUserId).update({ [key]: { title: programUpdate.title, createdAt: this.timestamp, active: false } });
            this.props.firebase.user(currentUserId).update({ programDate: this.timestamp });
            this.props.history.push(`/admin-user-programs/${currentUserId}/${key}`);
         })
         .catch(error => this.setState({ error }));
   }

   handleCreateNewWorkout = (e) => {
      e.preventDefault();
      // const currentUserId = this.state.user.uid;
      const currentUserId = this.props.match.params.id;

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
         this.props.firebase.workoutId(this.props.match.params.id, each).update({ active: false });
      })

      this.props.firebase.workoutId(this.props.match.params.id, wid).update({ active: true });
      this.props.firebase.user(this.props.match.params.id).update({ programDate: this.timestamp });
   };

   setInactive = (wid) => () => {
      // console.log(wid, "setInactive");
      this.props.firebase.workoutId(this.props.match.params.id, wid).update({ active: false });
      this.props.firebase.user(this.props.match.params.id).update({ programDate: null });
   };

   fetchPrograms = () => {
      //what is this doing???
      this.props.firebase
         .programIds()
         .on('value', snapshot => {
            const idsObject = snapshot.val()

            if (idsObject) {
               // console.log("idsObject", idsObject);
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

   fetchUser = () => {
      this.setState({ loading: true });

      this.props.firebase
         .workoutIds(this.props.match.params.id)
         .on('value', snapshot => {
            const workoutIdsObject = snapshot.val();
            if (workoutIdsObject) {
               // const idsArray = Object.keys(workoutsObject);
               this.setState({
                  workoutids: workoutIdsObject,
               });
            } else {
               this.setState({ workoutids: [] })
            }
         });

      if (this.props.location.state && this.props.location.state.user) {
         // console.log("user from location state");
         this.setState({ user: this.props.location.state.user, loading: false });
         return;
      }

      this.props.firebase
         .user(this.props.match.params.id)
         .on('value', snapshot => {
            const userObject = snapshot.val();
            if (userObject) {
               this.setState({
                  user: userObject,
                  loading: false,
               });
            } else {
               this.setState({
                  user: null,
                  loading: false,
               });
            }
         });
   }

   componentDidUpdate(prevProps) {
      if (this.props.match.params.id !== prevProps.match.params.id) {
         this.props.firebase.user(prevProps.match.params.id).off();
         this.fetchUser();
      }
   }

   componentDidMount() {
      this.fetchUser();
      this.fetchPrograms();
   }

   onRemoveWorkout = () => {
      const wid = this.state.removeKey;
      this.props.firebase.workout(this.props.match.params.id, wid).remove();
      this.props.firebase.workoutId(this.props.match.params.id, wid).remove();
      this.handleRemoveClose();
   }

   componentWillUnmount() {
      this.props.firebase.user(this.props.match.params.id).off();
      this.props.firebase.workoutIds(this.props.match.params.id).off();
      this.props.firebase.programIds().off();
   }

   render() {
      const { user, loading, workoutids, show, programIds, error } = this.state;
      const workoutidsArray = Object.keys(workoutids).reverse();

      return (

         <div>
            {loading && <div>Loading ...</div>}
            {error && <Alert>{error.message}</Alert>}

            {user && (
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
                  </Modal>

                  <ListGroup className="mb-5">
                     <ListGroup.Item className="no-top-border">
                        <Button block onClick={this.handleOpen}>Add Program</Button>
                     </ListGroup.Item>
                     {
                        (workoutidsArray.length > 0)
                           ?
                           (
                              workoutidsArray.map((workoutId, index) => {

                                 const date = new Date(workoutids[workoutId].createdAt);
                                 const dateString = date.toLocaleDateString("en-US");

                                 return (

                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                       <>
                                          <span>
                                             {/* <strong>Title:</strong> {workoutids[workoutId].title} */}
                                             <strong>Title:</strong>
                                             <Link
                                                className="ml-2 btn btn-link"
                                                to={{
                                                   pathname: `${ROUTES.WORKOUTS}/${this.props.match.params.id}/${workoutId}`,
                                                   state: { user, workoutids },
                                                }}
                                             >
                                                {workoutids[workoutId].title}
                                             </Link>

                                             <strong className="ml-2">Date:</strong> {dateString}
                                          </span>

                                          <span>
                                             {!workoutids[workoutId].active
                                                ? <HoverButton variant={"outline-warning"} text={"Inactive"} hoveredText={"Activate"} onClick={this.setActive(workoutId)} />
                                                : <HoverButton variant={"outline-success"} text={"Active"} hoveredText={"Deactivate"} onClick={this.setInactive(workoutId)} />
                                             }
                                             <Button className="ml-3" variant="outline-danger"
                                                type="button"
                                                onClick={() => this.setRemoveKey(workoutId)}
                                             >
                                                Delete
                                             </Button>
                                          </span>
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
            )
            }
         </div>
      );
   }
}

const WorkoutList = withRouter(withFirebase(WorkoutListBase));

export default WorkoutList;