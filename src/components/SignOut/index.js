import React from 'react';

import { withFirebase } from '../Firebase';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const SignOutButtonBase = ({ firebase }) => (
   <Button block variant="danger" onClick={firebase.doSignOut}>
      Sign Out
   </Button>
)

const SignOutButton = withFirebase(SignOutButtonBase);

const SignOutForm = () => (
   <Card className="mt-3 mb-5">
      <Card.Header>
         Sign out
      </Card.Header>
      <Card.Body className=" px-3 py-4">
         <SignOutButton />
      </Card.Body>
   </Card>
);



export default SignOutForm;

export { SignOutButton };