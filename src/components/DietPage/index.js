import React, { useContext } from 'react';

import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import { AuthUserContext } from '../Session';
// import Diet from '../Diet';
import Diet2 from '../Diet2';
import Container from 'react-bootstrap/Container';

const DietPage = () => {
   const authUser = useContext(AuthUserContext);

   // if (!authUser.ACTIVE) {
   //    return null;
   // }

   return (
      <>
         <Container fluid>
            <div className="app-top d-flex justify-content-center">
               <div className="contain-width">
                  <h3>Diet Sheet</h3>
                  {/* <Diet uid={authUser.uid} /> */}
                  <Diet2 uid={authUser.uid} />
               </div>
            </div>
         </Container >
      </>
   )
}

const condition = authUser => !!authUser && authUser.ACTIVE;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(DietPage);