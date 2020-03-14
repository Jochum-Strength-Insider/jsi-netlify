import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
   email: yup.string().email()
      .required('Required'),
   password: yup.string().required("Required")
});

const SignInPage = () => (
   <>
      <Container >
         <Row>
            <Col className="d-flex justify-content-center align-items-center">
               <Card style={{ width: "30rem" }}>
                  <Card.Header className="text-center">
                     <h1>Sign In</h1>
                     <SignUpLink />
                  </Card.Header>
                  <Card.Body>
                     <SignInForm />

                     {/* <SignInGoogle /> */}
                     {/* <SignInFacebook /> */}
                     {/* <SignInTwitter /> */}
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>

   </>
);

// const ERROR_CODE_ACCOUNT_EXISTS =
//    'auth/account-exists-with-different-credential';

// const ERROR_MSG_ACCOUNT_EXISTS = `
//   An account with an E-Mail address to
//   this social account already exists. Try to login from
//   this account instead and associate your social accounts on
//   your personal account page.
// `;

const SignInFormBase = ({ firebase, history }) => {
   const [error, setError] = useState(null);

   const onSubmit = (values, { resetForm }) => {
      const { email, password } = values;

      firebase
         .doSignInWithEmailAndPassword(email, password)
         .then(() => {
            setError(null);
            resetForm({});
            history.push(ROUTES.LANDING);
         })
         .catch(error => {
            setError(error);
         });
   };

   return (
      // <Form onSubmit={this.onSubmit}>
      //    <Form.Group controlId="formBasicEmail">
      //       <Form.Label>Email Address</Form.Label>
      //       <Form.Control
      //          required
      //          name="email"
      //          value={email}
      //          onChange={this.onChange}
      //          type="text"
      //          placeholder="Email Address"
      //       />
      //    </Form.Group>

      //    <Form.Group controlId="formBasicPasswordOne">
      //       <Form.Label>Password</Form.Label>
      //       <Form.Control
      //          name="password"
      //          value={password}
      //          onChange={this.onChange}
      //          type="password"
      //          placeholder="Password"
      //       />
      //    </Form.Group>

      //    <PasswordForgetLink />

      //    <Button disabled={isInvalid} block variant="primary" type="submit">
      //       Sign In
      //    </Button>

      //    {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}
      // </Form>

      <Formik
         validationSchema={schema}
         onSubmit={onSubmit}
         initialValues={{
            email: '',
            password: '',
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
               <Form noValidate onSubmit={handleSubmit}>
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

                  <Form.Group md="4" >
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        placeholder="Password"
                     />
                     <Form.Control.Feedback type="invalid">
                        {errors.password}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <PasswordForgetLink />

                  <hr></hr>

                  <Button block variant="primary" type="submit">
                     Sign In
                     </Button>

                  {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}
               </Form>
            )}
      </Formik>
   );
}

// eslint-disable-next-line
// class SignInGoogleBase extends Component {
//    constructor(props) {
//       super(props);

//       this.state = { error: null };
//    }

//    onSubmit = event => {
//       this.props.firebase
//          .doSignInWithGoogle()
//          .then(socialAuthUser => {
//             // Create a user in your Firebase Realtime Database too
//             return this.props.firebase.user(socialAuthUser.user.uid).set({
//                username: socialAuthUser.user.displayName,
//                email: socialAuthUser.user.email,
//                roles: [],
//             });
//          })
//          .then(() => {
//             this.setState({ error: null });
//             this.props.history.push(ROUTES.LANDING);
//          })
//          .catch(error => {
//             if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
//                error.message = ERROR_MSG_ACCOUNT_EXISTS;
//             }

//             this.setState({ error });
//          });

//       event.preventDefault();
//    };

//    render() {
//       const { error } = this.state;

//       return (
//          <Form onSubmit={this.onSubmit}>
//             <Button type="submit" block>Sign In with Google</Button>

//             {error && <p>{error.message}</p>}
//          </Form>
//       );
//    }
// }

const SignInLink = ({ color }) => (
   <p style={{ color: color }}>
      Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
   </p>
);

// class SignInFacebookBase extends Component {
//    constructor(props) {
//       super(props);

//       this.state = { error: null };
//    }

//    onSubmit = event => {
//       this.props.firebase
//          .doSignInWithFacebook()
//          .then(socialAuthUser => {
//             // Create a user in your Firebase Realtime Database too
//             return this.props.firebase.user(socialAuthUser.user.uid).set({
//                username: socialAuthUser.additionalUserInfo.profile.name,
//                email: socialAuthUser.additionalUserInfo.profile.email,
//                roles: [],
//             });
//          })
//          .then(() => {
//             this.setState({ error: null });
//             this.props.history.push(ROUTES.HOME);
//          })
//          .catch(error => {
//             if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
//                error.message = ERROR_MSG_ACCOUNT_EXISTS;
//             }

//             this.setState({ error });
//          });

//       event.preventDefault();
//    };

//    render() {
//       const { error } = this.state;

//       return (
//          <form onSubmit={this.onSubmit}>
//             <button type="submit">Sign In with Facebook</button>

//             {error && <p>{error.message}</p>}
//          </form>
//       );
//    }
// }

// class SignInTwitterBase extends Component {
//    constructor(props) {
//       super(props);

//       this.state = { error: null };
//    }

//    onSubmit = event => {
//       this.props.firebase
//          .doSignInWithTwitter()
//          .then(socialAuthUser => {
//             // Create a user in your Firebase Realtime Database too
//             return this.props.firebase.user(socialAuthUser.user.uid).set({
//                username: socialAuthUser.additionalUserInfo.profile.name,
//                email: socialAuthUser.additionalUserInfo.profile.email,
//                roles: [],
//             });
//          })
//          .then(() => {
//             this.setState({ error: null });
//             this.props.history.push(ROUTES.HOME);
//          })
//          .catch(error => {
//             if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
//                error.message = ERROR_MSG_ACCOUNT_EXISTS;
//             }

//             this.setState({ error });
//          });

//       event.preventDefault();
//    };

//    render() {
//       const { error } = this.state;

//       return (
//          <form onSubmit={this.onSubmit}>
//             <button type="submit">Sign In with Twitter</button>

//             {error && <p>{error.message}</p>}
//          </form>
//       );
//    }
// }

const SignInForm = compose(
   withRouter,
   withFirebase,
)(SignInFormBase);

// const SignInGoogle = compose(
//    withRouter,
//    withFirebase,
// )(SignInGoogleBase);

// const SignInFacebook = compose(
//    withRouter,
//    withFirebase,
// )(SignInFacebookBase);

// const SignInTwitter = compose(
//    withRouter,
//    withFirebase,
// )(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInLink };
// export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
