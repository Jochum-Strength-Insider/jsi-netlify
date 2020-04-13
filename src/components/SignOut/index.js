import React from 'react';

import { withFirebase } from '../Firebase';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SignOutButton = ({ firebase }) => (
   <Card className="mt-3 mb-5">
      <Card.Header>
         Sign out
      </Card.Header>
      <Card.Body className=" px-3 py-4">
         <Button block variant="primary" onClick={firebase.doSignOut}>
            Sign Out
      </Button>
      </Card.Body>
   </Card>
);

export default withFirebase(SignOutButton);
