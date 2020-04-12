import React, { Component } from "react";

// import moment from 'moment';

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

// Todo

// add delete confirmation modal

class WorkoutListBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         workoutIds: [],
         programIds: { "default": { title: "default", createdAt: props.firebase.serverValue.TIMESTAMP } },
         program: PROGRAM(props.firebase.serverValue.TIMESTAMP),
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

      const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const programUpdate = { ...this.state.program };
      programUpdate["createdAt"] = timestamp;

      // console.log("program", this.state.program);
      console.log("creating new workout from template");

      // console.log(programUpdate, timestamp);

      this.props.firebase.workouts(currentUserId).push(programUpdate)
         .then((snap) => {
            const key = snap.key;
            // const title = this.state.programIds[key].title;
            // console.log(this.state.programIds);

            this.props.firebase.workoutIds(currentUserId).update({ [key]: { title: programUpdate.title, createdAt: timestamp, active: false } });
            this.props.firebase.user(currentUserId).update({ programDate: timestamp });
            this.props.history.push(`/admin/${currentUserId}/${key}`);
         })
         .catch(error => this.setState({ error }));
   }

   handleCreateNewWorkout = (e) => {
      e.preventDefault();
      // const currentUserId = this.state.user.uid;
      const currentUserId = this.props.match.params.id;

      const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const programData = PROGRAM(timestamp);
      programData["title"] = this.state.programTitle;

      console.log("creating new workout");


      this.props.firebase.workouts(currentUserId).push(programData)
         .then((snap) => {
            const key = snap.key;
            this.props.firebase.workoutIds(currentUserId).update({ [key]: { title: programData.title, createdAt: timestamp, active: false } });
            this.props.firebase.user(currentUserId).update({ programDate: timestamp });
            this.props.history.push(`/admin/${currentUserId}/${key}`);
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
      console.log(key);
      this.props.firebase.program(key).once("value").then((snap) => {
         const programObject = snap.val();

         if (programObject) {
            this.setState({ program: programObject });
         }
      })
   }

   // Should this be a property on the user object or left in the workoutId???
   // Set program date when it's activated?
   setActive = (wid) => () => {
      const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      console.log(wid, "setActive");
      const workoutIdsArray = Object.keys(this.state.workoutIds);
      workoutIdsArray.forEach(each => {
         this.props.firebase.workoutId(this.props.match.params.id, each).update({ active: false });
      })

      this.props.firebase.workoutId(this.props.match.params.id, wid).update({ active: true });
      this.props.firebase.user(this.props.match.params.id).update({ programDate: timestamp });
   };

   setInactive = (wid) => () => {
      console.log(wid, "setInactive");
      this.props.firebase.workoutId(this.props.match.params.id, wid).update({ active: false });
      this.props.firebase.user(this.props.match.params.id).update({ programDate: null });
   };

   componentDidMount() {
      //Refactor??? Might have multiple sources of information between workoutIds and user.workouts / etc...

      //listen for update to users workouts
      this.props.firebase
         .workoutIds(this.props.match.params.id)
         .on('value', snapshot => {
            const workoutsObject = snapshot.val();

            if (workoutsObject) {
               // const idsArray = Object.keys(workoutsObject);

               this.setState({
                  workoutIds: workoutsObject,
               });
            } else {
               this.setState({ workoutIds: [] })
            }
         });

      // Default program when there are no programs to add.
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

      if (this.state.user) {
         return;
      }

      this.setState({ loading: true });

      this.props.firebase
         .user(this.props.match.params.id)
         .on('value', snapshot => {
            this.setState({
               user: snapshot.val(),
               loading: false,
            });
         });
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
      const { user, loading, workoutIds, show, programIds, error } = this.state;
      const workoutIdsArray = Object.keys(workoutIds).reverse();

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
                        (workoutIdsArray.length > 0)
                           ?
                           (
                              workoutIdsArray.map((workoutId, index) => {

                                 const date = new Date(workoutIds[workoutId].createdAt);
                                 const dateString = date.toLocaleDateString("en-US");

                                 return (

                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                       <>
                                          <span>
                                             {/* <strong>Title:</strong> {workoutIds[workoutId].title} */}
                                             <strong>Title:</strong>
                                             <Link
                                                className="ml-2 btn btn-link"
                                                to={{
                                                   pathname: `${ROUTES.ADMIN}/${this.props.match.params.id}/${workoutId}`,
                                                   state: { user },
                                                }}
                                             >
                                                {workoutIds[workoutId].title}
                                             </Link>

                                             <strong className="ml-2">Date:</strong> {dateString}
                                          </span>

                                          <span>
                                             {!workoutIds[workoutId].active
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