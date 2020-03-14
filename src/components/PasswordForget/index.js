import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Formik } from 'formik';
import * as yup from 'yup';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
   <div>
      <h1 className="color-white">Forgot Password?</h1>
      <PasswordForgetForm />
   </div>
);

const schema = yup.object({
   email: yup.string().email()
      .required('Required'),

});

const PasswordForgetFormBase = ({ firebase }) => {
   const [error, setError] = useState(null);
   const [alert, setAlert] = useState(false);

   const onAlert = () => {
      setAlert(true)
      setTimeout(() => {
         setAlert(false);
      }, 2000);
   }

   const onSubmit = (values, { resetForm }) => {
      firebase
         .doPasswordReset(values.email)
         .then(() => {
            setError(null);
            onAlert();
            resetForm({});
         })
         .catch(error => {
            setError(error);
         });
   };

   return (
      <Card className="my-3">
         <Card.Header>Forgot Password</Card.Header>
         <Card.Body>
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

                        <hr></hr>
                        {
                           alert
                              ? <Button type="submit" variant="success" block>New Password Requested!</Button>
                              : <Button type="submit" variant="primary" block>Request New Password</Button>
                        }

                        {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}
                     </Form>
                  )}
            </Formik>

         </Card.Body>
      </Card>
   );
}

const PasswordForgetLink = () => (
   <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
   </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
