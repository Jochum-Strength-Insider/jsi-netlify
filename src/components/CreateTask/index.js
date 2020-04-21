
import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';

import Tasks from '../Tasks';

const style = { width: "100%", maxWidth: "1000px", flex: "1" };

const CreateTask = () => {
   return (
      <>
         <div className="d-flex justify-content-center">
            <div style={style}>
               <h3>Exercises</h3>
               <Tasks />
            </div>
         </div>
      </>
   )
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withAuthorization(condition),
)(CreateTask);
