import React from 'react';
import TaskItem from './TaskItem';

import ListGroup from 'react-bootstrap/ListGroup';

import './style.css';

const TasksList = ({ onSetRemoveTaskKey, tasks, onEditTask }) => (
   <ListGroup variant="flush" className="list-group-bordered">
      {tasks.map(task => (
         <ListGroup.Item className="d-flex justify-content-between align-items-center" key={task.tid}>
            <TaskItem
               task={task}
               onSetRemoveTaskKey={onSetRemoveTaskKey}
               onEditTask={onEditTask}
            />
         </ListGroup.Item>
      ))}
   </ListGroup>
);

export default TasksList;