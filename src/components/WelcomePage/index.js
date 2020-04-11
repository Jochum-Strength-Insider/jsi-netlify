import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';


class WelcomePage extends Component {

   render() {
      return (
         <div>
            <h1 className="color-white">Home Page</h1>
            <p>WELCOMMMEEEE!</p>
         </div>
      );
   }
}

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(WelcomePage);
