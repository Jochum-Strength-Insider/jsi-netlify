import React from 'react';

import jochumJoin from "../../../images/jochum-join.jpg";

const SignUpPanel = () => (
  <div className="sign-up mb-5">
    <img
      className="d-block w-100"
      src={jochumJoin}
      alt="Insider Sign Up"
    />
    <div className="sign-up-info-contain">
      <div className="sign-up-info">
        <h2 className="sign-up-title text-center pt-4 mt-4">Jochum Strength Insider</h2>
        <p className="includes">Includes:</p>
        <ul>
          <li>New Program Every 3 Weeks</li>
          <li>Individualized Training Program</li>
          <li>Jochum Strength Nutrition Plan</li>
          <li>Weekly Check Ins With A Jochum Strength Coach</li>
        </ul>
        <p className="once">Once You Sign Up you will be emailed by Coach Jochum and the programming process will begin!</p>

        <p className="info"><i>*This program will be automatically charged every three weeks until you decide to cancel. You are paying a subscription-based fee for access to Jochum Strength Content including programming, nutriton and advice*</i></p>

        <div className="d-flex justify-content-center pb-4 mb-4">
          <a className="sign-up-button" href="/subscribe">Sign Up!</a>
        </div>
      </div>
    </div>
  </div>
);


export default SignUpPanel;