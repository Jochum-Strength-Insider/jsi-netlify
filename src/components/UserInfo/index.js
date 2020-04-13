import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

// add createdAt to signIn

const UserInfoCard = ({ authUser }) => {

   const date = new Date(authUser.createdAt);
   const dateString = date.toLocaleDateString("en-US");

   return (

      <Card className="my-3">
         <Card.Header>Account Info</Card.Header>
         <Card.Body className="px-0 py-2">
            <ListGroup variant="flush">
               <ListGroup.Item>Username: {authUser.username}</ListGroup.Item>
               <ListGroup.Item>Email: {authUser.email}</ListGroup.Item>
               <ListGroup.Item>Programs: {authUser.workoutids ? Object.keys(authUser.workoutids).length : 0}</ListGroup.Item>
               <ListGroup.Item>Member Since: {dateString}</ListGroup.Item>
            </ListGroup>
         </Card.Body>
      </Card>

   );
}

export default UserInfoCard;
