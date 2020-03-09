import React, { Component } from "react";

import Modal from '../Modal';
import TaskForm from './TaskForm';
import Button from 'react-bootstrap/Button';

class TaskItem extends Component {
   constructor(props) {
      super(props);

      const { e, l } = this.props.task;

      this.state = {
         editMode: false,
         link: l,
         exercise: e,
      };
   }

   onToggleEditMode = (e) => {
      e.preventDefault();
      this.setState(state => ({
         editMode: !state.editMode,
      }));
   };

   handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
   };

   onReset = (event) => {
      event.preventDefault();

      const { e, l } = this.props.task

      this.setState({
         link: l,
         exercise: e,
      })
   }

   handleClose = () => {
      this.setState({ editMode: false })
   }

   handleOpen = () => {
      this.setState({ editMode: true })
   }

   render() {
      const { task, onSetRemoveTaskKey } = this.props;
      const { editMode } = this.state;

      return (
         <>
            <Modal show={editMode} handleClose={this.handleClose} heading={"Edit Exercise " + task.e}>
               <TaskForm task={this.props.task} onEditTask={this.props.onEditTask} handleClose={this.handleClose} />
            </Modal>

            <span>
               <strong>{task.e}</strong>
            </span>

            <span>
               <>
                  <Button className="ml-2" variant="outline-primary" onClick={this.onToggleEditMode}>Edit</Button>

                  <Button className="ml-2" variant="outline-danger"
                     type="button"
                     onClick={() => onSetRemoveTaskKey(task)}
                  >
                     Delete
                        </Button>
               </>
            </span>
         </>
      )
   }
}

export default TaskItem;