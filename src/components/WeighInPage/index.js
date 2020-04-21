import React, { useContext } from 'react';

import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import { AuthUserContext } from '../Session';
import Weight from '../WeighIn';
// import Card from 'react-bootstrap/Card';

const style = { width: "100%", maxWidth: "1000px", flex: "1" };

const WeighInPage = () => {

   const authUser = useContext(AuthUserContext);
   return (
      <>
         <div className="d-flex justify-content-center">
            <div style={style} className="mb-5">
               <h1>Weigh In</h1>
               <Weight authUser={authUser} />
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