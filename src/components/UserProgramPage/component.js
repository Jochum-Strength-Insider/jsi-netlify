import React, { Component, useContext } from 'react';
import { child, onValue } from "firebase/database";
import { compose } from 'recompose';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

import {
   AuthUserContext,
   withAuthorization,
   withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';

import UserTable from '../UserTable';

const ProgramPage = () => {
   const authUser = useContext(AuthUserContext);

   if (authUser.ACTIVE) {

      return (
         <Container fluid>
            <div className="d-flex justify-content-center">
               <div className="contain-width">
                  <ManageUserTables authUser={authUser} />
               </div>
            </div>
         </Container>
      )
   } else {
      return (
         <Container fluid>
            <Row className="d-flex justify-content-center mt-5">
               <Card style={{ width: "30rem" }}>
                  <Card.Header className="text-center">
                     <strong>Account Status</strong>
                  </Card.Header>
                  <Card.Body className="text-center">
                     Your Account is currently deactivated. To reactivate your account reapply for Jochum Strength Insider or contact jochumstrength@gmail.com for more information.
                  </Card.Body>
               </Card>
            </Row>
         </Container>
      )
   }

};

class ManageUserTablesBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         workoutIndex: 0,
         // workoutids: [],
         workoutsList: [],
         program: JSON.parse(localStorage.getItem('program')) || null,
         key: null,
      }
   }

   saveTracking = (authUser, workoutId) => (phase, day, row, item) => {
      return this.props.firebase
         .workout(authUser, workoutId)
         .child("instruction")
         .child(phase)
         .update({ [day]: item })
         .catch(error => this.setState({ error }));
   }

   componentDidMount() {
      const activeWorkoutsRef = this.props.firebase.activeWorkoutIds(this.props.authUser.uid);
      onValue(activeWorkoutsRef, (snap) => {
            const idObject = snap.val();
            if (idObject) {
               const key = Object.keys(idObject)[0];
               this.setState({ key: key });

               const workoutRef = this.props.firebase.workout(this.props.authUser.uid, key);
               onValue(workoutRef, (snapshot) => {
                  const workoutObject = snapshot.val();
                  if (workoutObject) {
                     localStorage.setItem('program', JSON.stringify(workoutObject));
                     this.setState({ program: workoutObject })
                  } else {
                     localStorage.removeItem('program');
                     this.setState({ program: null })
                  }
               });
            } else {
               localStorage.removeItem('program');
               this.setState({ program: null, key: "" })
            }
       });

   }

   componentWillUnmount() {
      console.log("componentWillUnmount()", this.props.authUser.uid, this.state.key);
      this.props.firebase.workout(this.props.authUser.uid, this.state.key).off();
      this.props.firebase.workouts(this.props.authUser.uid).off();
      this.props.firebase.activeWorkoutIds(this.props.authUser.uid).off();
   }

//     onValue(firebase.adminUnreadMessages(), (snapshot) => {
//       const unreadObject = snapshot.val();
//         if (unreadObject) {
//           const unreadList = Object.keys(unreadObject).reverse().map(key => ({
//             ...unreadObject[key],
//             mid: key,
//           }));
//           setUnread(unreadList);
//         } else {
//           setUnread([])
//         }
//     });


   render() {
      // Figure this out. It feels pretty hacky.

      const { authUser } = this.props;
      const { program, key } = this.state;

      const dateString = program ? new Date(program.createdAt).toLocaleDateString("en-US") : "";

      // console.log(program);
      return (
         <div className="app-top">
            {program ? (
               <>
                  <h1>{program.title}</h1>
                  <h4>{dateString}</h4>
                  <UserTable program={program} uid={authUser.uid} saveTracking={this.saveTracking(authUser.uid, key)} />
               </>
            ) : (
                  <Container fluid>
                     <Row className="d-flex justify-content-center mt-5">
                        <Card>
                           <Card.Header className="text-center">
                              <strong>No Programs</strong>
                           </Card.Header>
                           <Card.Body className="text-center">
                              You have no available programs at this time.
                           </Card.Body>
                        </Card>
                     </Row>
                  </Container>
               )}
         </div>
      )
   }
}

const ManageUserTables = withFirebase(ManageUserTablesBase);

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(ProgramPage);
