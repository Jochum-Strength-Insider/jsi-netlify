import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./style.css";

const Details = () => (
  // <div className="details">
  //   <Row
  //     className="d-flex justify-content-center align-items-center no-padding"
  //   >
  //     <Col className="mx-0 px-2">
  //       <div className="details">
  //         <h3 className="detailsTitle mb-3 mx-0" style={{ width: "100%", display: "block" }}>The Details</h3>
  //         <p>At Jochum Strength we specialize in creating the best possible human we can. We are one of the only elite training services to offer an online programming service. This online programming allows you to have all the access to the Jochum Strength Programming and Coaching you would receive in person, all at the convenience of your own gym. These online programs are made to get you to your goal, whether that be fat-loss, muscle gain, becoming more athletic, staying healthy or feeling better. We are one of the few science backed training programs that will use the cutting edge of strength and conditioning techniques to get you to where you need to go.  A program includes the following:</p>
  //         <p> <b>Online Program</b>: All of your liftings, mobility and athletic movements programmed for you and your needs and accessible at the touch of your fingers. Every exercise is linked to a video to demonstrate how to perform the exercise. </p>
  //         <p> <b>Diet Guidelines</b>: These are the Jochum Strength Diet Guidelines that we use with all of our clients. The goal is to teach our clients how to fish, not fish for them. These guidelines are there to give you set rules that you can apply to your life style!</p>
  //         <p><b>Weekly Check In's</b>: Every single week you will have a online review session with a Jochum Strength coach to go over the previous weeks lifts, diet and life. We tailor these to what you need. Struggling with diet? We will focus on that. Need a form check? We will review videos. Just need some motivation to attack the next week? We got you for that as well!</p>
  //       </div>
  //     </Col>
  //   </Row>
  // </div>
  // <div className="details">
  //   <Container className="details-content">
  //     <Row>
  //       <Col md={12} className="details-section-title">
  //         <h2>The Details</h2>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>
  //         <div>
  //           <p>At <strong>Jochum Strength</strong> we specialize in creating the best possible human we can. We are one of the only elite training services to offer an online programming service. This online programming allows you to have all the access to the Jochum Strength Programming and Coaching you would receive in person, all at the convenience of your own gym. These online programs are made to get you to your goal, whether that be fat-loss, muscle gain, becoming more athletic, staying healthy or feeling better. We are one of the few science backed training programs that will use the cutting edge of strength and conditioning techniques to get you to where you need to go.  A program includes the following:</p>
  //           <p><b>Online Program</b>: All of your liftings, mobility and athletic movements programmed for you and your needs and accessible at the touch of your fingers. Every exercise is linked to a video to demonstrate how to perform the exercise. </p>
  //           <p><b>Diet Guidelines</b>: These are the Jochum Strength Diet Guidelines that we use with all of our clients. The goal is to teach our clients how to fish, not fish for them. These guidelines are there to give you set rules that you can apply to your life style!</p>
  //           <p><b>Weekly Check In's</b>: Every single week you will have a online review session with a Jochum Strength coach to go over the previous weeks lifts, diet and life. We tailor these to what you need. Struggling with diet? We will focus on that. Need a form check? We will review videos. Just need some motivation to attack the next week? We got you for that as well!</p>
  //         </div>
  //       </Col>
  //     </Row>
  //   </Container>
  // </div>

  <div className="details-section">
    <Container className='details-wrapper'>
      <Row>
        <Col className="details-section-title">
          <h2>The Details</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <p>At <strong>Jochum Strength</strong> we specialize in creating the best possible human we can. We are one of the only elite training services to offer an online programming service. This online programming allows you to have all the access to the Jochum Strength Programming and Coaching you would receive in person, all at the convenience of your own gym. These online programs are made to get you to your goal, whether that be fat-loss, muscle gain, becoming more athletic, staying healthy or feeling better. We are one of the few science backed training programs that will use the cutting edge of strength and conditioning techniques to get you to where you need to go.  A program includes the following:</p>
            <p><b>Online Program</b>: All of your liftings, mobility and athletic movements programmed for you and your needs and accessible at the touch of your fingers. Every exercise is linked to a video to demonstrate how to perform the exercise. </p>
            <p><b>Diet Guidelines</b>: These are the Jochum Strength Diet Guidelines that we use with all of our clients. The goal is to teach our clients how to fish, not fish for them. These guidelines are there to give you set rules that you can apply to your life style!</p>
            <p><b>Weekly Check In's</b>: Every single week you will have a online review session with a Jochum Strength coach to go over the previous weeks lifts, diet and life. We tailor these to what you need. Struggling with diet? We will focus on that. Need a form check? We will review videos. Just need some motivation to attack the next week? We got you for that as well!</p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Details;