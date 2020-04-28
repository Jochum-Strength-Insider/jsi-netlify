import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TasksList from './TasksList';
import Modal from '../Modal';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import EXERCISES from '../../constants/exercisesEmbed2';

import { withFirebase } from '../Firebase';

class Tasks extends Component {
   constructor(props) {
      super(props);

      this.state = {
         open: false,
         show: false,
         tasks: JSON.parse(localStorage.getItem('tasks')) || [],
         userInput: "",

         // The suggestions that match the user's input
         filteredSuggestions: [],
         showAll: false,

         removeKey: null,
      }
   }

   handleClose = () => {
      this.setState({ show: false })
   }

   handleOpen = (e) => {
      e.preventDefault();
      this.setState({ show: true })
   }

   handleRemoveClose = () => {
      this.setState({ showRemove: false, removeKey: null })
   }

   // handleRemoveOpen = (e) => {
   //    e.preventDefault();
   //    this.setState({ showRemove: true })
   // }

   onSetRemoveTaskKey = (task) => {
      this.setState({ showRemove: true, removeKey: task });
   }

   onRemoveTask = () => {
      const { tid } = this.state.removeKey;
      this.props.firebase
         .task(tid)
         .remove()
         .then(this.handleRemoveClose)
         .catch(error => this.setState({ error }));

   };

   onShowAll = () => {
      this.setState({ showAll: true });
   }

   onChange = (e) => {
      const { value } = e.currentTarget;
      const { tasks } = this.state;

      // Filter our suggestions that don't contain the user's input
      const filteredSuggestions = tasks.filter(
         suggestion =>
            suggestion.e.toLowerCase().indexOf(value.toLowerCase()) > -1
         // suggestion.Exercise.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      this.setState({
         filteredSuggestions,
         userInput: value,
      });
   }

   onEditTask = (task, taskUpdate) => {
      const { tid } = task;
      // const { tid, ...taskSnapshot } = task;
      // console.log(tid, taskSnapshot, taskUpdate);
      // this.props.firebase.task(tid).set({
      //    title: title,
      //    instruction,
      // });
      return this.props.firebase
         .task(tid)
         .set(taskUpdate)
   };

   fetchTasks() {
      const { firebase } = this.props;

      firebase.tasks().on("value", (snap) => {

         const tasksObject = snap.val();

         if (tasksObject) {
            // console.log('queried')
            const tasksList = Object.keys(tasksObject);
            const tasksArray = tasksList.map(key => ({
               tid: key,
               ...tasksObject[key],
            }));

            localStorage.setItem('tasks', JSON.stringify(tasksArray));
            this.setState({ tasks: tasksArray, filteredSuggestions: tasksArray.reverse() })
         } else {
            localStorage.removeItem('tasks');
            this.setState({ tasks: [], loading: false })
         }

         this.setState({ loading: false });
      });
   }

   // Add all tasks to firebase
   // onCreateTask = (task) => {
   //    this.props.firebase
   //       .tasks()
   //       .push(task)
   //       .then(task => {
   //          if (task) {
   //             console.log("New Task Created");
   //          }
   //       })
   // }

   componentDidMount() {
      // EXERCISES.forEach(each => this.onCreateTask(each));
      this.fetchTasks();
   }

   componentWillUnmount() {
      this.props.firebase.tasks().off();
   }

   render() {

      const { tasks, filteredSuggestions, showAll, removeKey, userInput } = this.state;
      const suggestions = showAll ? filteredSuggestions : filteredSuggestions.slice(0, 10);
      const editOpen = filteredSuggestions.length > 0 ? true : false;
      const AppendButton = editOpen ? (
         <Button type="submit" variant="secondary">Edit Task</Button>
      ) : (
            <Button type="submit" variant="secondary">Add Task</Button>
         )
      const AppendModal = editOpen ? (
         <TaskForm task={suggestions[0]} onEditTask={this.onEditTask} handleClose={this.handleClose} />
      ) : (
            <TaskForm title={userInput} handleClose={this.handleClose} />
         )

      return (
         <>
            {suggestions &&
               (
                  <>
                     <Modal handleClose={this.handleClose} show={this.state.show} heading={editOpen ? "Edit Exercise" : "Create Exercise"}>
                        {AppendModal}
                     </Modal>

                     {
                        removeKey &&
                        (<Modal handleClose={this.handleRemoveClose} show={this.state.showRemove} heading={"Remove " + removeKey.e + "?"}>
                           <Form className="d-flex justify-content-between align-items-center">
                              <Button variant="outline-danger" onClick={this.onRemoveTask}>Remove</Button>
                              <Button variant="primary" onClick={this.handleRemoveClose}>Cancel</Button>
                           </Form>
                        </Modal>)
                     }

                     <Form onSubmit={this.handleOpen}>
                        <InputGroup className="mb-3">
                           <Form.Control
                              type="text"
                              value={userInput}
                              name="userInput"
                              placeholder={suggestions[0] ? suggestions[0].e : 'test'}
                              onChange={this.onChange}
                           />

                           <InputGroup.Append>
                              {AppendButton}
                           </InputGroup.Append>
                        </InputGroup>
                     </Form>

                     {(tasks.length > 0)
                        ? (<TasksList tasks={suggestions} onSetRemoveTaskKey={this.onSetRemoveTaskKey} onEditTask={this.onEditTask} />)
                        : (<p>No tasks...</p>)
                     }
                     <Row className="py-4">
                        <Col className="text-center">

                           <Form>
                              <Form.Group controlId="exampleForm">
                                 <Button onClick={this.onShowAll} variant="primary" block>Load All</Button>
                              </Form.Group>
                           </Form>
                        </Col>

                     </Row>
                  </>
               )
            }
         </>
      )
   }
}

export default withFirebase(Tasks);