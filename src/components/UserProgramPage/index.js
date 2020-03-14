import React, { Component, useContext } from 'react';
import { compose } from 'recompose';

// TODO:

// Limit loading previous workouts to loading batches of 5. Only for admin. Users can only see one workout at a time.
// break the account page into smaller components

import {
   AuthUserContext,
   withAuthorization,
   withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';

import UserTable from '../UserTable';

const ProgramPage = () => {
   const authUser = useContext(AuthUserContext);

   return (
      <ManageUserTables authUser={authUser} />
   )
};

class ManageUserTablesBase extends Component {
   constructor(props) {
      super(props);

      // Odd bug where the workoutIds aren't progagated to the authUser object when a user is created.
      // It's fixed after a refresh but going straight from signup to account causes an error.
      // const workoutids = !!props.authUser.workoutids
      //    ? Object.keys(props.authUser.workoutids)
      //    : Object.keys(props.authUser.workouts[0]);

      // const workoutsList = Object.keys(this.state.workouts[0]).map(key => ({
      //    ...props.authUser.workouts[0][key],
      //    workoutId: key
      // }));

      this.state = {
         workoutIndex: 0,
         // workoutids: [],
         workoutsList: [],
         program: null,
         key: null,
         // allLoaded: false,
      }
   }

   // previousWorkout = () => {
   //    if (!this.state.allLoaded) {
   //       this.props.firebase.workouts(this.props.authUser.uid).on("value", (snapshot) => {
   //          const workouts = snapshot.val();

   //          if (workouts) {
   //             const workoutsList = Object.keys(workouts).map(key => ({
   //                ...workouts[key],
   //                workoutId: key
   //             }));
   //             console.log("loaded Previous workouts:", workoutsList);
   //             const workoutIndex = workoutsList.length - 1;
   //             this.setState({ workoutsList: workoutsList, workoutIndex: workoutIndex - 1, allLoaded: true });
   //          }
   //       });
   //    } else {
   //       this.setState(prevState => { return { workoutIndex: prevState.workoutIndex - 1 } });
   //    }
   // }

   // nextWorkout = () => {
   //    // I don't think you'll need to load more from next... The most current workout is always available in the authUser.
   //    this.setState(prevState => { return { workoutIndex: prevState.workoutIndex + 1 } })
   // }

   // handleComplete = (workoutId, phase, completed) => {
   //    console.log(workoutId, phase, completed)
   //    this.props.firebase
   //       .workout(this.props.authUser.uid, workoutId)
   //       .child("instruction")
   //       .child(phase)
   //       .update({ completed: completed })
   //       .catch(error => this.setState({error}));
   // }

   saveTracking = (authUser, workoutId) => (phase, day, row, item) => {
      // console.log(authUser, workoutId, phase, day, item);

      return this.props.firebase
         .workout(authUser, workoutId)
         .child("instruction")
         .child(phase)
         .update({ [day]: item })
         .catch(error => this.setState({ error }));
   }

   componentDidMount() {

      this.props.firebase.workouts(this.props.authUser.uid)
         .limitToLast(1)
         .on("value", snapshot => {
            const workoutObject = snapshot.val();

            if (workoutObject) {

               const workoutids = Object.keys(workoutObject)

               const workoutsList = workoutids.map(key => ({
                  ...workoutObject[key],
                  workoutId: key
               }));

               this.setState({ workoutsList: workoutsList })
            }
         });

      this.props.firebase.workoutIds(this.props.authUser.uid)
         .on("value", snapshot => {
            const workoutIdsObject = snapshot.val();

            if (workoutIdsObject) {
               const workoutids = Object.keys(workoutIdsObject)
               this.setState({ workoutids: workoutids })
            }
         });

      this.props.firebase
         .workoutIds(this.props.authUser.uid)
         .orderByChild("active")
         .equalTo(true)
         .limitToLast(1)
         .once("value", (snap) => {
            const idObject = snap.val();
            if (idObject) {
               const key = Object.keys(idObject)[0];

               this.props.firebase.workout(this.props.authUser.uid, key)

                  .on("value", snapshot => {
                     const workoutObject = snapshot.val();

                     if (workoutObject) {
                        this.setState({ program: workoutObject, key })
                     }
                  });
            }
         }).catch(error => this.setState({ error }));
   }

   componentWillUnmount() {
      this.props.firebase.workout(this.props.authUser.uid, this.state.key);
      this.props.firebase.workouts(this.props.authUser.uid).off();
      this.props.firebase.workoutIds(this.props.authUser.uid).off();
   }

   render() {
      // Figure this out. It feels pretty hacky.

      const { authUser } = this.props;
      const { program, key } = this.state;
      // const { workoutIndex, workoutids, workoutsList } = this.state;
      // const { workoutIndex, workoutsList } = this.state;
      // const program = workoutsList[workoutIndex] ? workoutsList[workoutIndex] : null;
      const date = program ? new Date(program.createdAt) : new Date();
      const dateString = date.toLocaleDateString("en-US");
      // const index = program ? workoutids.indexOf(program.workoutId) : 0;

      // console.log(program);
      return (
         <div>
            {program ? (
               <>
                  <h1 className="color-white">Program: {program.title}</h1>
                  <h4 className="color-white">{dateString}</h4>
                  {/* <div>
                     <button onClick={this.previousWorkout} disabled={index === 0}>←</button>
                     <button onClick={this.nextWorkout} disabled={index === workoutids.length - 1}>→</button>
                  </div> */}
                  <UserTable program={program} uid={authUser.uid} saveTracking={this.saveTracking(authUser.uid, key)} />
               </>
            ) : (
                  <h1>No programs</h1>
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
