import React from 'react';
import TaskItem from './TaskItem';

import ListGroup from 'react-bootstrap/ListGroup';

const TasksList = ({ onSetRemoveTaskKey, tasks, onEditTask }) => (
   <ListGroup variant="flush">
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