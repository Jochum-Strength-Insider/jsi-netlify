import React, { Component } from "react";

import { withFirebase } from '../Firebase';

// From Create Program

// import BreadCrumbs from '../BreadCrumbs';
import Modal from '../Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { withRouter } from 'react-router-dom';
import CreateProgramTable from './CreateProgramTable';

class ProgramItemBase extends Component {
   constructor(props) {
      super(props);

      this.titleRef = React.createRef();

      this.state = {
         loading: false,
         program: null,
         pid: this.props.match.params.pid || null,
         editable: false,
         tasks: [
            {
               instruction: {
                  Number: "1", Description: "Monster Walks", Link: "https://www.youtube.com", Sets: "3", Reps: "5", Rest: ":0",
                  tracking: { "week 1": "", "week 2": "", "week 3": "" }
               }, title: "Default"
            }
         ],
         showTitle: false,
         error: null,
         ...props.location.state,
      };
   }

   fetchPrograms = () => {
      this.props.firebase
         .program(this.state.pid)
         .on('value', snapshot => {
            const programObject = snapshot.val();
            if (programObject) {
               this.setState({
                  program: programObject,
                  loading: false,
                  editable: true,
               });
            } else {
               console.log("no program object");
            }
         });
   }

   fetchTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      if (tasks) {
         this.setState({ tasks: tasks });
      } else {
         this.props.firebase.tasks().once("value").then(snap => {
            const tasksObject = snap.val();
            if (tasksObject) {
               const tasksList = Object.keys(tasksObject);
               const tasksArray = tasksList.map(key => ({
                  tid: key,
                  ...tasksObject[key],
               }));
               this.setState({ tasks: tasksArray })
            }
         })
      }
   }

   showTitleModal = () => {
      this.setState({ showTitle: true });
   }

   hideTitleModal = () => {
      this.setState({ showTitle: false });
   }

   editTitle = (e) => {
      e.preventDefault();
      const title = this.titleRef.current.value.trim();

      this.props.firebase
         .program(this.state.pid)
         .update({ "title": title })
         .then(() => {
            this.props.firebase
               .programId(this.state.pid)
               .update({ "title": title })
               .then(this.hideTitleModal);
         })
   }

   onSave = (phase, phaseUpdate) => {
      const { firebase } = this.props;
      const { pid } = this.state;

      console.log("updating program");

      return firebase
         .program(pid)
         .child("instruction")
         .child(phase)
         .set(phaseUpdate)
   }

   componentDidMount() {
      this.fetchPrograms();
      this.fetchTasks();
   }

   componentWillUnmount() {
      this.props.firebase.program(this.state.pid).off();
      this.props.firebase.workouts(this.state.uid).off();
      this.props.firebase.workouts(this.state.uid).child(this.state.pid).off()
      // this.props.firebase.tasks().off();
   }

   render() {
      const { program, loading, pid, uid, tasks, error, showTitle } = this.state;
      const title = program ? program.title : "";
      // console.log(pid, uid);
      // console.log(program);

      return (
         <>
            <Modal handleClose={this.hideTitleModal} show={showTitle} heading={"Change Title?"} >
               <Form onSubmit={this.editTitle}>
                  <Form.Group>
                     <Form.Label>Program Title</Form.Label>
                     <Form.Control
                        type="text"
                        ref={this.titleRef}
                        defaultValue={title}
                     />
                  </Form.Group>
                  <Button type="submit">Save Title Edit</Button>
               </Form>
            </Modal>

            {loading && <div>Loading ...</div>}
            {error && <Alert>{error.message}</Alert>}

            {program && (
               <>
                  <span className="d-flex justify-content-between align-items-center">
                     <h3 className="program-title" onClick={this.showTitleModal}>{program.title}</h3>
                  </span>
                  <CreateProgramTable onSave={this.onSave} tasks={tasks} program={program} pid={pid} uid={uid} />
               </>
            )}
         </>
      );
   }
}

// const ProgramItem = withRouter(withFirebase(ProgramItemBase));
const ProgramItem = withRouter(withFirebase(ProgramItemBase));

export default ProgramItem;
