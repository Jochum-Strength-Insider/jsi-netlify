import React from 'react';
import './style.css';

import { MoreButton } from '../LandingCarousel';

const CallToAction = () => {
  return (
    <div className="section-b">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12">
            <h3>Ready To Level Up Your Life?</h3>
            <p>Sign up for Jochum Strength Insider and start today.</p>
            <MoreButton url={"/subscribe"} text={"Sign Up"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction;