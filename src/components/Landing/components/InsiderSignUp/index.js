import React from 'react';
import './style.css';

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// import carousel4 from "../../../../images/carousel4.jpg";
// import carousel5 from "../../../../images/carousel5.jpg";
// import carousel6 from "../../../../images/carousel6.jpg";
import jochumJoin from "../../../../images/jochum-join.jpg";

// const MoreArrow = () => <i className="fas fa-chevron-down"></i>

export const MoreButton = ({ url, text }) => <a href={url} className="learn-more-button">{text}</a>

const InsiderSignUp = () => {
  return (
    <div className="landing-sign-up">
      <img
        className="landing-sign-up-img w-100"
        src={jochumJoin}
        alt="Jochum Strength coach teaching a class."
      />
      <div className="landing-sign-up-wrapper d-flex justify-content-end">
        <div className="landing-sign-up-content-wrapper col-md-12 col-12">
          <div className="landing-sign-up-content">
            <h2 className="landing-sign-up-title text-center pt-4 mt-4 ">Jochum Strength Insider</h2>
            <p className="landing-sign-up-caption d-none d-sm-block">Our Online Training Platform For People Looking To Level Up Their Lives!</p>
            <ul className="fa-ul landing-sign-up-list">
              <li><span className="fa-li"><i className="fas fa-check"></i></span>Programs That Fit Your Goals</li>
              <li><span className="fa-li"><i className="fas fa-check"></i></span>Jochum Strength Elite Diet Guideline Ebook</li>
              <li><span className="fa-li"><i className="fas fa-check"></i></span>Weight and Diet Tracking Within App</li>
              <li><span className="fa-li"><i className="fas fa-check"></i></span>Contact With Jochum Strength Coach</li>
            </ul>
            <p className="landing-sign-up-for d-none d-sm-none d-md-block">For Coaches, Ex-Athletes and People looking to unlock their inner-movers by feeling better, moving better and looking better!</p>
            <div className="d-flex justify-content-center pb-4 mb-4">
              <MoreButton url={"/subscribe"} text={"Sign Up"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsiderSignUp;