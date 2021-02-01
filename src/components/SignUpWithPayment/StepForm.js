import React, { useState } from "react";
import InfoForm from './InfoForm';
import Payment from './PaymentFull';
import { withFirebase } from '../Firebase';
import moment from 'moment';

const StepForm = ({ step, next, prev, firebase }) => {
  const initialValues = {
    username: "",
    email: "",
    passwordOne: "",
  }
  const [formValues, setFormValues] = useState(initialValues);

  const infoStepSubmit = (values, resetForm) => {
    setFormValues(values);
    next();
  };

  const paymentStepSubmit = () => {
    createUser();
    next();
  };

  const createUser = () => {
    const timestamp = Number(moment().format("x"));
    const { username, email, passwordOne } = formValues;

    firebase
      .doTestCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        console.log("user created");
        authUser.user.sendEmailVerification({
          url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT || process.env.REACT_APP_DEV_CONFIRMATION_EMAIL_REDIRECT,
        });

        const { uid } = authUser.user;

        firebase.user(uid).set({
          username,
          email,
          ADMIN: false,
          ACTIVE: true,
          createdAt: timestamp,
          programDate: null,
          unread: null,
        });

        const text = "Welcome Message";

        const messageObject = {
          text,
          userId: "welcome_message_id",
          username: "Welcome",
          createdAt: timestamp,
        };

        firebase.user(uid).child("unread").push(messageObject)
        firebase.messages(uid).push(messageObject)

      }).catch(error => console.log(error));
  }

  return (
    <div className="d-flex flex-column payment-sign-up w-100 text-dark">
      <div className="pb-5 text-center">
        <h2 className="font-weight-bold">Insider Sign Up</h2>
        <p className="lead">Our Online Training Platform For People Looking To Level Up Their Lives!</p>
      </div>
      <InfoStep step={step} stepSubmit={infoStepSubmit} formValues={formValues} />
      <PaymentStep step={step} stepSubmit={paymentStepSubmit} email={formValues.email} username={formValues.username} back={prev} />
      <WelcomeStep step={step} formValues={formValues} />
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
const SignUpInfo = () => (
  <div className="landing-sign-up-wrapper d-flex justify-content-end">
    <div className="landing-sign-up-content-wrapper col-md-12 col-12">
      <div className="landing-sign-up-content">
        <p className="landing-sign-up-caption d-none d-sm-block">Our Online Training Platform For People Looking To Level Up Their Lives!</p>
        <ul className="fa-ul landing-sign-up-list">
          <li><span className="fa-li"><i className="fas fa-check"></i></span>Programs That Fit Your Goals</li>
          <li><span className="fa-li"><i className="fas fa-check"></i></span>Jochum Strength Elite Diet Guideline Ebook</li>
          <li><span className="fa-li"><i className="fas fa-check"></i></span>Weight and Diet Tracking Within App</li>
          <li><span className="fa-li"><i className="fas fa-check"></i></span>Contact With Jochum Strength Coach</li>
        </ul>
      </div>
    </div>
  </div>
)

const InfoStep = ({ step, stepSubmit, formValues }) => {
  if (step !== 1) {
    return null
  }
  return (
    <div>
      <h3 className="mb-3">Account Info</h3>
      <InfoForm formValues={formValues} stepSubmit={stepSubmit} />
    </div>
  )
};

const PaymentStep = ({ step, stepSubmit, back }) => {
  if (step !== 2) {
    return null
  }
  return (
    <div>
      <h3 className="mb-3">Cart</h3>
      <Payment stepSubmit={stepSubmit} back={back} />
    </div>
  );
};

const WelcomeStep = ({ step, formValues }) => {
  const { email } = formValues;
  if (step !== 3) {
    return null
  }
  return (
    <>
      <h3 className="mb-3">Welcome! Your Subscription Is Complete.</h3>
      <p>Thank you for subscribing to Jochum Strength Insider.</p>
      <p>A verification email has been sent to <b>{email}</b>. After verifying your email you can sign in to Jochum Strength Insider to begin the program process.</p>
    </>
  )
};

export default withFirebase(StepForm);
