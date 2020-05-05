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
            <h2 className="sign-up-title">VIP ONLINE PROGRAMMING</h2>
            <p className="includes">Includes:</p>
            <ul>
               <li>Nutrition Guidelines and Diet Sheets</li>
               <li>Individualized Training Program</li>
               <li>Access to Jochum Strength Resources <br /> (Exercise Index, Facebook Group, Q/A, Ect.)</li>
               <li>Weekly Exercise, Diet and Program Review</li>
            </ul>
            <p className="once">Once You Sign Up you will be emailed by Coach Jochum and the programming process will begin!</p>

            <p className="info"><i>*This program will be automatically charged every three weeks until you decide to cancel. You are paying a subscription-based fee for access to Jochum Strength Content including programming, nutriton and advice*</i></p>

            <div className="d-flex justify-content-center">
               <a className="sign-up-button" target="_blank" rel="noreferrer noopener" href="https://www.powr.io/apps/paypal-button/view?id=21034953&mode=page&transaction_id=4977048">Sign Up!</a>
            </div>
         </div>
      </div>
   </div>
);


export default SignUpPanel;