import React from 'react';
import './main.css';

const Dots2 = ({ step }) => {
  return (
    <>
      <div className="dots-contain">
        <ul className="custom-dots progressbar">
          <li className={`first ${step === 1 ? "active" : ""}`}>Account</li>
          <li className={`first ${step === 2 ? "active" : ""}`}>Payment</li>
          <li className={`first ${step === 3 ? "active" : ""}`}>Welcome</li>
        </ul>
      </div>
    </>
  )
};


export default Dots2;