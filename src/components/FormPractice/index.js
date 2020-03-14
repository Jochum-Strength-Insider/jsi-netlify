import React, { Component } from "react";

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import { Formik } from 'formik';
import * as yup from 'yup';

// class LoginForm extends React.Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          formValues: {
//             email: "",
//             password: ""
//          },
//          formErrors: {
//             email: "",
//             password: ""
//          },
//          formValidity: {
//             email: false,
//             password: false
//          },
//          isSubmitting: false
//       };
//    }

//    handleChange = ({ target }) => {
//       const { formValues } = this.state;
//       formValues[target.name] = target.value;
//       this.setState({ formValues });
//       this.handleValidation(target);
//    };

//    handleValidation = target => {
//       const { name, value } = target;
//       const fieldValidationErrors = this.state.formErrors;
//       const validity = this.state.formValidity;
//       const isEmail = name === "email";
//       const isPassword = name === "password";
//       const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//       validity[name] = value.length > 0;
//       fieldValidationErrors[name] = validity[name]
//          ? ""
//          : `${name} is required and cannot be empty`;

//       if (validity[name]) {
//          if (isEmail) {
//             validity[name] = emailTest.test(value);
//             fieldValidationErrors[name] = validity[name]
//                ? ""
//                : `${name} should be a valid email address`;
//          }
//          if (isPassword) {
//             validity[name] = value.length >= 3;
//             fieldValidationErrors[name] = validity[name]
//                ? ""
//                : `${name} should be 3 characters minimum`;
//          }
//       }

//       this.setState({
//          formErrors: fieldValidationErrors,
//          formValidity: validity
//       });
//    };

//    handleSubmit = event => {
//       event.preventDefault();
//       this.setState({ isSubmitting: true });
//       const { formValues, formValidity } = this.state;
//       if (Object.values(formValidity).every(Boolean)) {
//          alert("Form is validated! Submitting the form...");
//          this.setState({ isSubmitting: false });
//       } else {
//          for (let key in formValues) {
//             let target = {
//                name: key,
//                value: formValues[key]
//             };
//             this.handleValidation(target);
//          }
//          this.setState({ isSubmitting: false });
//       }
//    };

//    render() {
//       const { formValues, formErrors, isSubmitting } = this.state;
//       return (
//          <div className="container">
//             <div className="row mb-5">
//                <div className="col-lg-12 text-center">
//                   <h1 className="mt-5">Login Form</h1>
//                </div>
//             </div>
//             <div className="row">
//                <div className="col-lg-12">
//                   <form onSubmit={this.handleSubmit}>
//                      <div className="form-group">
//                         <label>Email address</label>
//                         <input
//                            type="email"
//                            name="email"
//                            className={`form-control ${
//                               formErrors.email ? "is-invalid" : ""
//                               }`}
//                            placeholder="Enter email"
//                            onChange={this.handleChange}
//                            value={formValues.email}
//                         />
//                         <div className="invalid-feedback">{formErrors.email}</div>
//                      </div>
//                      <div className="form-group">
//                         <label>Password</label>
//                         <input
//                            type="password"
//                            name="password"
//                            className={`form-control ${
//                               formErrors.password ? "is-invalid" : ""
//                               }`}
//                            placeholder="Password"
//                            onChange={this.handleChange}
//                            value={formValues.password}
//                         />
//                         <div className="invalid-feedback">{formErrors.password}</div>
//                      </div>
//                      <button
//                         type="submit"
//                         className="btn btn-primary btn-block"
//                         disabled={isSubmitting}
//                      >
//                         {isSubmitting ? "Please wait..." : "Submit"}
//                      </button>
//                   </form>
//                </div>
//             </div>
//          </div>
//       );
//    }
// }


const schema = yup.object({
   firstName: yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
   lastName: yup.string().required(),
   username: yup.string().required(),
   email: yup.string()
      .email("Invalid Email")
      .required("Required"),
   city: yup.string().required(),
   state: yup.string().required(),
   zip: yup.string().required(),
   terms: yup.bool().required(),
});

class FormExample extends Component {

   onSubmit = ({ firstName, lastName, username, email, city, state, zip, terms }) => {
      console.log({ firstName, lastName, username, email, city, state, zip, terms });
   }

   render() {

      return (
         <Formik
            validationSchema={schema}
            onSubmit={this.onSubmit}
            initialValues={{
               firstName: 'test',
               lastName: 'test',
               username: "test",
               email: "",
               city: "test",
               state: "test",
               zip: "test",
               check: false,
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
                     <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationFormik01">
                           <Form.Label>First name</Form.Label>
                           <Form.Control
                              type="text"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              isValid={touched.firstName && !errors.firstName}
                           />
                           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationFormik02">
                           <Form.Label>Last name</Form.Label>
                           <Form.Control
                              type="text"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              isValid={touched.lastName && !errors.lastName}
                           />

                           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                           <Form.Label>Username</Form.Label>
                           <InputGroup>
                              <InputGroup.Prepend>
                                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                 type="text"
                                 placeholder="Username"
                                 aria-describedby="inputGroupPrepend"
                                 name="username"
                                 value={values.username}
                                 onChange={handleChange}
                                 isInvalid={!!errors.username}
                              />
                              <Form.Control.Feedback type="invalid">
                                 {errors.username}
                              </Form.Control.Feedback>
                           </InputGroup>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationFormik03">
                           <Form.Label>City</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="City"
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              isInvalid={!!errors.city}
                           />

                           <Form.Control.Feedback type="invalid">
                              {errors.city}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationFormik04">
                           <Form.Label>State</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="State"
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              isInvalid={!!errors.state}
                           />
                           <Form.Control.Feedback type="invalid">
                              {errors.state}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationFormik05">
                           <Form.Label>Zip</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Zip"
                              name="zip"
                              value={values.zip}
                              onChange={handleChange}
                              isInvalid={!!errors.zip}
                           />

                           <Form.Control.Feedback type="invalid">
                              {errors.zip}
                           </Form.Control.Feedback>
                        </Form.Group>
                     </Form.Row>

                     <Form.Row>
                        <Form.Group as={Col} md="3" controlId="validationFormik06">
                           <Form.Label>Email</Form.Label>
                           <Form.Control
                              type="email"
                              placeholder="Email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email}
                           />

                           <Form.Control.Feedback type="invalid">
                              {errors.email}
                           </Form.Control.Feedback>
                        </Form.Group>
                     </Form.Row>

                     <Form.Group>
                        <Form.Check
                           required
                           name="terms"
                           label="Agree to terms and conditions"
                           onChange={handleChange}
                           value={values.check}
                           isInvalid={!!errors.terms}
                           feedback={errors.terms}
                           id="validationFormik0"
                        />
                     </Form.Group>
                     <Button type="submit">Submit form</Button>
                  </Form>
               )}
         </Formik>
      );
   }
}

export default FormExample;
