
import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';

import Tasks from '../Tasks';
import Container from 'react-bootstrap/Container';


const CreateTask = () => {
   return (
      <>
         <Container fluid>

            <h3>Exercises</h3>

            <Tasks />
         </Container>

      </>
   )
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withAuthorization(condition),
)(CreateTask);
