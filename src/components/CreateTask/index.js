
import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';

import Tasks from '../Tasks';
import Container from 'react-bootstrap/Container';

const CreateTask = () => {
   return (
      <>
         <Container fluid>
            <div className="app-top d-flex justify-content-center">
               <div className="contain-width">
                  <h3>Exercises</h3>
                  <Tasks />
               </div>
            </div>
         </Container>
      </>
   )
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withAuthorization(condition),
)(CreateTask);
