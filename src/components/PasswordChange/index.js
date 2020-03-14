import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Formik } from 'formik';
import * as yup from 'yup';
import { withFirebase } from '../Firebase';

const schema = yup.object({
   passwordOne: yup.string()
      .min(7, 'Must be at least 7 characters!')
      .max(24, 'Too Long!')
      .required('Required'),
   passwordTwo: yup.string()
      .oneOf([yup.ref('passwordOne'), null], 'Passwords must match')
      .required("Required")
});

const PasswordChangeForm = ({ firebase }) => {

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
         .doPasswordUpdate(values.passwordOne)
         .then(() => {
            setError(null);
            onAlert();
            resetForm();
         })
         .catch(error => {
            setError(error);
         });
   };

   return (
      <Card className="my-3">
         <Card.Header>Change Password</Card.Header>
         <Card.Body>
            <Formik
               validationSchema={schema}
               onSubmit={onSubmit}
               initialValues={{
                  passwordOne: '',
                  passwordTwo: '',
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
                        <Form.Group md="4">
                           <Form.Label>Password</Form.Label>
                           <Form.Control
                              type="password"
                              aria-describedby="inputGroupPrepend"
                              name="passwordOne"
                              value={values.passwordOne}
                              onChange={handleChange}
                              isInvalid={!!errors.passwordOne}
                           />
                           <Form.Control.Feedback type="invalid">
                              {errors.passwordOne}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group md="4" controlId="validationFormik02">
                           <Form.Label>Confirm Password</Form.Label>
                           <Form.Control
                              type="password"
                              name="passwordTwo"
                              value={values.passwordTwo}
                              onChange={handleChange}
                              isInvalid={!!errors.passwordTwo}
                           />

                           <Form.Control.Feedback type="invalid">
                              {errors.passwordTwo}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <hr></hr>
                        {
                           alert
                              ? <Button type="submit" variant="success" block>Password Reset!</Button>
                              : <Button type="submit" variant="primary" block>Reset Password</Button>
                        }

                        {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}
                     </Form>
                  )}
            </Formik>

         </Card.Body>
      </Card>
   );
}

export default withFirebase(PasswordChangeForm);
