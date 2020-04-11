import React, { useContext } from 'react';

import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import { AuthUserContext } from '../Session';
import Weight from '../WeighIn';
import Card from 'react-bootstrap/Card';

const style = { width: "100%", maxWidth: "1000px", flex: "1" };

const WeighInPage = () => {

   const authUser = useContext(AuthUserContext);
   return (
      <>
         <div className="d-flex justify-content-center">
            <div style={style}>
               <h1 className="color-white">Weigh In</h1>
               <Card>
                  <Card.Body>
                     <Weight authUser={authUser} />
                  </Card.Body>
               </Card>
            </div>
         </div>
      </>
   )
}

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(WeighInPage);