import React, { useState } from 'react';

import { withFirebase } from '../Firebase';
import { Formik } from 'formik';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const SignUpFormBase = ({ firebase, stepSubmit, formValues }) => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const schema = yup.object({
    username: yup.string().required("Required"),
    email: yup.string()
      .email()
      .test('checkEmailUnique', 'This email is already registered.', (value) => {
        const validEmail = emailRegExp.test(value);
        if (validEmail) {
          return firebase.fetchSignInMethodsForEmail(value).then((providers) => {
            const validEmail = providers.length > 0 ? false : true;
            return validEmail;
          })
        } else {
          return true;
        }
      })
      .required("Required"),
    passwordOne: yup.string()
      .min(7, 'Must be at least 7 characters!')
      .max(24, 'Too Long!')
      .required('Required'),
  });

  const onSubmit = (values, { resetForm }) => {
    stepSubmit(values, resetForm);
  };

  return (
    <>
      <Formik
        validateOnChange={false}
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{ ...formValues }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Full Name"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username && touched.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email && touched.email}
                placeholder="Email Address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="validationFormikPasswordOne" className="sign-up-password">
              <div>
                <Form.Label>Password</Form.Label>
                <div className="float-right show-pssw" onClick={() => setShowPassword(!showPassword)}>{showPassword
                  ? <><i className="fas fa-eye-slash"></i> Hide</>
                  : <><i className="fas fa-eye"></i> Show</>
                }</div>
              </div>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="passwordOne"
                placeholder="Password"
                value={values.passwordOne}
                onChange={handleChange}
                isInvalid={!!errors.passwordOne && touched.passwordOne}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordOne}
              </Form.Control.Feedback>
            </Form.Group>
            <Button block variant="success" type="submit" className='py-2 my-3'>Continue To Payment</Button>
            {error && <Alert className="mt-3" variant="warning">{error.message}</Alert>}
            <p className="text-center"><i>Sign Up Complete After Payment</i></p>
          </Form>
        )}
      </Formik>
    </>
  );
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpForm;