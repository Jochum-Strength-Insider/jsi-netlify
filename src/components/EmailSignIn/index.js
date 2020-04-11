import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';

// import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
// import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
   email: yup.string().email()
      .required('Required'),
});

const style = {
   maxWidth: "600px",
   minWidth: "300px",
   width: "75%",
}

const EmailSignInPage = () => (
   <>
      <Container >
         <Row>
            <Col className="d-flex justify-content-center align-items-center">
               <div style={style}>
                  <h1 className="text-center">Email Sign In</h1>
                  <SignInForm />
               </div>
            </Col>
         </Row>
      </Container>
   </>
);

const SignInFormBase = ({ firebase, history }) => {
   const [error, setError] = useState(null);
   const [sent, setSent] = useState(false);

   useEffect(() => {
      // Confirm the link is a sign-in with email link.
      if (firebase.doIsSignInWithEmailLink(window.location.href)) {
         var email = window.localStorage.getItem('emailForSignIn');
         if (!email) {
            email = window.prompt('Please provide your email for confirmation');
         }
         firebase.doSignInWithEmailLink(email, window.location.href)
            .then(function (result) {
               window.localStorage.removeItem('emailForSignIn');
               //Change this to push to the welcome page.
               history.push(ROUTES.USERPROGRAM);
            })
            .catch(function (error) {
               setError(error);
            });
      }
   }, [firebase, history])

   const onSubmit = (values, { resetForm }) => {
      const { email } = values;

      console.log(email);

      firebase.doSendSignInLinkToEmail(email)
         .then(function () {
            resetForm({});
            setSent(true)
            window.localStorage.setItem('emailForSignIn', email);
         })
         .catch(function (error) {
            setError(error)
         });
   };

   return (
      // Can probably simplify this. Maybe remove formik and use createRef
      <Formik
         validationSchema={schema}
         onSubmit={onSubmit}
         initialValues={{
            email: '',
         }}
      >
         {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
         }) => (
               <Form className="w-100" noValidate onSubmit={handleSubmit}>
                  <Form.Group md="4" controlId="validationFormikUsername">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.email}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <hr></hr>

                  <Button disabled={sent} block variant="primary" type="submit">
                     Sign In
                     </Button>

                  {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}
                  {sent &&
                     <Alert className="mt-3" variant="success">
                        Email sign in link sent! Please check your inbox. <br />
                        If this is your first time signing in please set up a new password on the account page after login.
                  </Alert>}
               </Form>
            )}
      </Formik>
   );
}

export const EmailSignInLink = () => (
   <p>
      <Link to={ROUTES.SIGN_IN_LINK}>Email Sign In</Link>
   </p>
);

const SignInForm = compose(
   withRouter,
   withFirebase,
)(SignInFormBase);

export default EmailSignInPage;