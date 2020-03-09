import React from 'react';

import { withFirebase } from '../Firebase';
import Button from 'react-bootstrap/Button';

const SignOutButton = ({ firebase }) => (
   <Button className="mt-3 mb-5" variant="outline-primary" onClick={firebase.doSignOut} block>
      Sign Out
   </Button>
);

export default withFirebase(SignOutButton);
