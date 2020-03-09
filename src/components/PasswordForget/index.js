import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
   <div>
      <h1 className="color-white">PasswordForget</h1>
      <PasswordForgetForm />
   </div>
);


class PasswordForgetFormBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         email: '',
         error: null,
         alert: false,
      };
   }

   onAlert = () => {
      this.setState({ alert: true });
      setTimeout(() => {
         this.setState({ alert: false });
      }, 2000);
   }

   onSubmit = event => {
      event.preventDefault();
      const { email } = this.state;

      this.props.firebase
         .doPasswordReset(email)
         .then(() => {
            this.setState({
               email: '',
               error: null
            });
            this.onAlert();
         })
         .catch(error => {
            this.setState({ error });
         });
      // console.log(email);
   };

   onChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   };

   render() {
      const { error, email, alert } = this.state;

      return (
         <Card className="my-3">
            <Card.Header>Change Password</Card.Header>
            <Card.Body>

               <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="formEmailRequest">
                     <Form.Label>Email Address</Form.Label>
                     <Form.Control
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="email"
                        placeholder="Email Address"
                        required
                     />
                  </Form.Group>

                  {/* <Button variant="primary" type="submit">
                     Request New Password
                  </Button> */}
                  <hr></hr>
                  {
                     alert
                        ? <Button onClick={this.handleSave} type="submit" variant="success" block>New Password Requested!</Button>
                        : <Button onClick={this.handleSave} type="submit" variant="primary" block>Request New Password</Button>
                  }

                  {error && <p>{error.message}</p>}
                  {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}

               </Form>
            </Card.Body>
         </Card>
      );
   }
}

const PasswordForgetLink = () => (
   <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
   </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
