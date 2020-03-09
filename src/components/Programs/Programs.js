// Refactor so the state management is more clear. Similiar to Messages -> MessageList -> MessageItem
// Low priority.

import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

import ProgramList from './ProgramList';
import { PROGRAM } from '../../constants/defaultProgram';

import Alert from 'react-bootstrap/Alert';

class ProgramsBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         programTitle: "",
         loading: false,
         programs: [],
         limit: 10,
         error: null,
      }
   }

   componentDidMount() {
      this.onListenForPrograms();
   }

   onListenForPrograms() {
      this.setState({ loading: true });

      this.props.firebase
         .programIds()
         .orderByChild('createdAt')
         .limitToLast(this.state.limit)
         .on("value", snapshot => {
            const programObject = snapshot.val();

            if (programObject) {
               const programList = Object.keys(programObject).map(key => ({
                  ...programObject[key],
                  pid: key,
               }));

               this.setState({ programs: programList, loading: false })

            } else {
               this.setState({ programs: null, loading: false })
            }

            this.setState({ loading: false });
         })
   }

   componentWillUnmount() {
      this.props.firebase.programs().off();
      this.props.firebase.programIds().off();
   }

   onChangeText = event => {
      this.setState({ programTitle: event.target.value });
   }

   handleCreateProgram = () => {
      const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const programData = PROGRAM(timestamp);

      console.log("creating new program");
      this.props.firebase.programs().push(programData)
         .then((snap) => {
            const key = snap.key;
            this.props.firebase.programIds().update({ [key]: { title: this.state.programTitle, createdAt: timestamp } });
         })
         .catch(error => this.setState({ error }));
   }

   onRemoveProgram = pid => {
      this.props.firebase.program(pid).remove();
      this.props.firebase.programId(pid).remove();
   };

   // onEditprogram = (program, text) => {
   //    const { uid, ...programSnapshot } = program;
   //    this.props.firebase.program(program.uid).set({
   //       ...programSnapshot,
   //       text,
   //       editedAt: this.props.firebase.serverValue.TIMESTAMP,
   //    });
   // };

   // onNextPage = () => {
   //    this.setState(
   //       state => ({ limit: state.limit + 5 }),
   //       this.onListenForPrograms,
   //    );
   // };

   render() {
      const { text, programs, loading, error } = this.state;

      return (
         <AuthUserContext.Consumer>
            {authUser => (
               <div>
                  {error && <Alert variant="warning">{error.message}</Alert>}

                  {!loading && programs && (
                     <button type="button" onClick={this.onNextPage}>
                        More
                     </button>
                  )}

                  {loading && <div>Loading ...</div>}
                  {programs ? (
                     <ProgramList
                        authUser={authUser}
                        programs={programs}
                        onRemoveProgram={this.onRemoveprogram}
                     />
                  ) : (
                        <div>There are no programs ...</div>
                     )}
                  <form onSubmit={event => this.onCreateProgram(event, authUser)}>
                     <input
                        type="text"
                        value={text}
                        onChange={this.onChangeText}
                     />
                     <button type="submit">Send</button>
                  </form>
               </div>
            )}
         </AuthUserContext.Consumer>
      )
   }
}

const Programs = withFirebase(ProgramsBase);

export default Programs;