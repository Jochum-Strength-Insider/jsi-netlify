import React, { useContext } from 'react';

import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

import { AuthUserContext } from '../Session';
import Diet from '../Diet';

const style = { width: "100%", maxWidth: "1000px", flex: "1" };

const DietPage = () => {

   const authUser = useContext(AuthUserContext);
   // console.log(authUser);
   return (
      <>
         <div className="d-flex justify-content-center">
            <div style={style}>
               <h1 className="color-white">Diet Sheet</h1>
               <Diet uid={authUser.uid} />
            </div>
         </div>
      </>
   )
}

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(DietPage);