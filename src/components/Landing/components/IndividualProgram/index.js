import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import iphones from "../../../../images/iphones.png";

import { MoreButton } from '../LandingCarousel';

import './style.css';

const ProgramSection = () => {
  return (
    <>
      <Row className="program-section" >
        <Col xs={12} md={6} className="d-flex my-auto align-items-center justify-content-center">
          <div className='program-section-container'>
            <h3 className="program-section-title" >Online Training Experience</h3>
            <p className="program-section-caption" >
              Jochum Strength Insider provides online access to all its features through a responsive mobile experience.
            </p>
            <MoreButton url={'/subscribe'} text={'Sign Up'} />
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex my-auto align-items-center justify-content-center">
          <div className=" d-flex my-auto align-items-center justify-content-center program-section-container">
            <img className="program-section-img" src={iphones} alt="Iphones showing the Jochum Strength website." />
          </div>
        </Col>
      </Row>
    </>
  )
};

export default ProgramSection;