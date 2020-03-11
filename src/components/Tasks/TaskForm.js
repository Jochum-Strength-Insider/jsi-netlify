import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


class TaskForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         link: "https://www.youtube.com",
         exercise: "default",
         error: null,
      }
   }

   onChange = (e) => {
      const { value, name } = e.target;
      this.setState({ [name]: value });
   }

   onCreateTask = (e) => {
      const { link, exercise } = this.state;

      const newTask = {
         "e": exercise,
         "l": link,
      }

      this.props.firebase
         .tasks()
         .push(newTask)
         .then(this.props.handleClose)
         .catch(error => {
            this.setState({ error });
         });

      e.preventDefault();
   }

   onSaveEditText = (e) => {
      const { link, exercise } = this.state;
      const taskUpdate = {
         l: link,
         e: exercise,
      }
      this.props.onEditTask(this.props.task, taskUpdate)
         .then(this.props.handleClose)
         .catch(error => this.setState({ error }));

      e.preventDefault();
   };

   onSetStateToDefaultProps = (event) => {
      if (event) { event.preventDefault() };

      const { e, l } = this.props.task;

      this.setState({
         exercise: e,
         link: l,
      })

   }

   componentDidMount() {
      if (this.props.task) {
         this.onSetStateToDefaultProps();
      }
      if (this.props.title) {
         this.setState({ exercise: this.props.title })
      }
   }

   render() {
      const { link, exercise, error } = this.state;
      return (
         <Form>

            <Form.Group controlId="formExercie">
               <Form.Label>Exercise</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Exercise"
                  name={"exercise"}
                  onChange={this.onChange}
                  value={exercise}
               />
            </Form.Group>

            <Form.Group controlId="formLink">
               <Form.Label>Youtube Embed Link</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Url"
                  name={"link"}
                  onChange={this.onChange}
                  value={link}
               />
            </Form.Group>

            {this.props.task
               ? (
                  <span>
                     <Button className="mr-2" onClick={this.onSaveEditText}>Save</Button>
                     <Button onClick={this.onSetStateToDefaultProps}>Reset</Button>
                  </span>
               )
               :
               (
                  <Button onClick={this.onCreateTask} variant="primary">
                     Submit
                  </Button>
               )
            }
            {error && <Alert variant="warning">{error.message}</Alert>}

         </Form>
      )
   }
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withFirebase,
   withAuthorization(condition),
)(TaskForm);
