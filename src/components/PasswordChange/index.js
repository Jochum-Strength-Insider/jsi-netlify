import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { withFirebase } from '../Firebase';

// Is there a better logic for this so the password error does show right away?
// Low priority

class PasswordChangeForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         passwordOne: '',
         passwordTwo: '',
         error: null,
         alert: false
      };
   }

   onAlert = () => {
      this.setState({ alert: true });
      setTimeout(() => {
         this.setState({ alert: false });
      }, 2000);
   }

   onSubmit = (e) => {
      e.preventDefault();
      // e.stopPropagation();

      const { passwordOne, passwordTwo } = this.state;
      const isValid = (passwordOne === passwordTwo) && (passwordOne !== '') && (passwordOne.length > 7);
      if (isValid === false) {
         e.preventDefault();
         e.stopPropagation();
      } else {
         this.props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
               this.setState({
                  passwordOne: '',
                  passwordTwo: '',
                  error: null,
               });
               this.onAlert();
            })
            .catch(error => {
               this.setState({ error });
            });
      }
   };

   onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
   };

   render() {
      const { passwordOne, passwordTwo, error, alert } = this.state;

      const isValid = (passwordOne === passwordTwo) && (passwordOne !== '') && (passwordOne.length > 7);

      return (
         <Card className="my-3">
            <Card.Header>Change Password</Card.Header>
            <Card.Body>
               <Form validated={isValid} onSubmit={this.onSubmit}>
                  <Form.Group controlId="formPasswordOne">
                     <Form.Label>New Password</Form.Label>
                     <Form.Control
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        required
                        placeholder="New Password"

                        isInvalid={passwordOne.length < 7}
                     />
                     <Form.Control.Feedback type="invalid">Passwords Must Have 7 Or More Characters</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPasswordTwo">
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        required
                        placeholder="Confirm New Password"
                        isInvalid={passwordOne !== passwordTwo}
                     />

                     <Form.Control.Feedback type="invalid">Passwords Must Match</Form.Control.Feedback>

                  </Form.Group>

                  {/* <Button variant="primary" type="submit">
                     Reset Password
                  </Button> */}

                  <hr></hr>
                  {
                     alert
                        ? <Button onClick={this.handleSave} type="submit" variant="success" block>Password Reset!</Button>
                        : <Button onClick={this.handleSave} type="submit" variant="primary" block>Reset Password</Button>
                  }

                  {/* {error && <p>{error.message}</p>} */}
                  {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}

               </Form>
            </Card.Body>
         </Card>


      );
   }
}

export default withFirebase(PasswordChangeForm);
