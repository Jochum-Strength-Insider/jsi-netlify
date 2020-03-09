import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { PROGRAM } from '../../constants/defaultProgram';
import { SignInLink } from '../SignIn';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const SignUpPage = () => (
   <>
      <Container >
         <Row>
            <Col className="d-flex justify-content-center align-items-center">
               <Card style={{ width: "30rem" }}>
                  <Card.Header className="text-center">
                     <h1>Sign Up</h1>
                     <SignInLink />
                  </Card.Header>
                  <Card.Body>
                     <SignUpForm />
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   </>
);

const INITIAL_STATE = {
   username: '',
   email: '',
   passwordOne: '',
   passwordTwo: '',
   isAdmin: false,
   error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
   }

   onSubmit = event => {
      const { username, email, passwordOne, isAdmin } = this.state;

      this.props.firebase
         .doCreateUserWithEmailAndPassword(email, passwordOne)
         .then(authUser => {
            // Create a user in your Firebase realtime database
            this.props.firebase.user(authUser.user.uid).set({
               username,
               email,
               ADMIN: isAdmin,
               createdAt: this.props.firebase.serverValue.TIMESTAMP,
               programDate: this.props.firebase.serverValue.TIMESTAMP,
            });
            return authUser.user.uid;
         })
         .then(uid => {

            const timestamp = this.props.firebase.serverValue.TIMESTAMP;
            const programData = PROGRAM(timestamp);

            this.props.firebase.workouts(uid).push(programData)
               .then((snap) => {
                  const key = snap.key;
                  this.props.firebase.workoutIds(uid).update({ [key]: { title: "Your first program!", createdAt: timestamp } });
               });
         })
         .then(() => {
            return this.props.firebase.doSendEmailVerification();
         })
         .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.LANDING);
         })
         .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
               error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }

            this.setState({ error });
         });

      event.preventDefault();
   };

   onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
   };

   onChangeCheckbox = event => {
      this.setState({ [event.target.name]: event.target.checked });
   };

   render() {
      const {
         username,
         email,
         passwordOne,
         passwordTwo,
         // isAdmin,
         error,
      } = this.state;

      const isInvalid =
         passwordOne !== passwordTwo ||
         passwordOne === '' ||
         email === '' ||
         username === '' ||
         passwordOne.length < 7;

      return (
         <>

            <Form onSubmit={this.onSubmit}>
               <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                     required
                     name="username"
                     value={username}
                     onChange={this.onChange}
                     type="text"
                     placeholder="Full Name"
                  />
               </Form.Group>

               <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                     required
                     name="email"
                     value={email}
                     onChange={this.onChange}
                     type="text"
                     placeholder="Email@Address.com"
                  />
               </Form.Group>

               <Form.Group controlId="formBasicPasswordOne">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     required
                     name="passwordOne"
                     value={passwordOne}
                     onChange={this.onChange}
                     type="password"
                     placeholder="Password"
                     isInvalid={passwordOne !== passwordTwo}
                     isValid={passwordOne === passwordTwo && passwordOne.length > 7}
                  />
                  <Form.Control.Feedback type="invalid">Passwords Must Match And Have 7 Or More Characters</Form.Control.Feedback>
               </Form.Group>

               <Form.Group controlId="formBasicPasswordTwo">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     required
                     name="passwordTwo"
                     value={passwordTwo}
                     onChange={this.onChange}
                     type="password"
                     placeholder="Confirm Password"
                     isInvalid={passwordOne !== passwordTwo}
                     isValid={passwordOne === passwordTwo && passwordOne.length > 7}
                  />
               </Form.Group>

               {/*
               <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                     label="Admin"
                     name="isAdmin"
                     type="checkbox"
                     checked={isAdmin}
                     onChange={this.onChangeCheckbox} />
               </Form.Group> */}

               <Button disabled={isInvalid} block variant="primary" type="submit">
                  Sign Up
               </Button>

               {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}
            </Form>
         </>
      );
   }
}

const SignUpLink = () => (
   <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
   </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
