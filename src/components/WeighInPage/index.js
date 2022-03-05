import React, { useContext } from 'react';

import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import { AuthUserContext } from '../Session';
import Weight from '../WeighIn';
import Container from 'react-bootstrap/Container';

const WeighInPage = () => {

   const authUser = useContext(AuthUserContext);

   return (
      <Container fluid>
         <div className="app-top">
            <div className="d-flex justify-content-center ">
               <div className="mb-5 contain-width">
                  <Weight authUser={authUser} />
               </div>
            </div>
         </div>
      </Container>
   )
}

const condition = authUser => !!authUser && authUser.ACTIVE;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(WeighInPage);