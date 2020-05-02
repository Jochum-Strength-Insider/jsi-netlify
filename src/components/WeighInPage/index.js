import React, { useContext } from 'react';

import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import { AuthUserContext } from '../Session';
// import Weight from '../WeighIn';
import Weight2 from '../WeighIn2';
import Container from 'react-bootstrap/Container';

const WeighInPage = () => {

   const authUser = useContext(AuthUserContext);
   return (
      <Container fluid>
         <div className="app-top">
            <div className="d-flex justify-content-center ">
               <div className="mb-5 contain-width">
                  {/* <h3>Weigh In</h3> */}
                  {/* <Weight authUser={authUser} /> */}
                  <Weight2 authUser={authUser} />
               </div>
            </div>
         </div>
      </Container>
   )
}

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(WeighInPage);