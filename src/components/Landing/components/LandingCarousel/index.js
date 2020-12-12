import React from 'react';
import './style.css';

// import carousel4 from "../../../../images/carousel4.jpg";
// import carousel5 from "../../../../images/carousel5.jpg";
import carousel6 from "../../../../images/carousel6.jpg";

// const MoreArrow = () => <i className="fas fa-chevron-down"></i>

export const MoreButton = ({ url, text }) => <a href={url} className="learn-more-button">{text}</a>

const Splash = () => {
  return (
    <div className="hero">
      <img
        className="hero-img w-100"
        src={carousel6}
        alt="Jochum Strength coach teaching a class."
      />
      <div className="hero-wrapper">
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">Jochum Strength Insider</h1>
            <p className="hero-caption">Our Online Training Platform For People Looking To Level Up Their Lives!</p>
          </div>
        </div>
        <div className="hero-footer">
          <MoreButton url={"#features"} text={"Learn More"} />
        </div>
      </div>
    </div>
  )
}

export default Splash;