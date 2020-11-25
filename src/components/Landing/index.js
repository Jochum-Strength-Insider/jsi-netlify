import React from 'react';

import SignUp from './InsiderSignUp';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../Footer';

import './style.css';

import carousel4 from "../../images/carousel4.jpg";
import carousel5 from "../../images/carousel5.jpg";
import carousel6 from "../../images/carousel6.jpg";
import individualized from "../../images/individualized.jpg";
import results1 from "../../images/results1.jpg";
import results2 from "../../images/results2.jpg";
// import results3 from "../../images/results3.jpg";
import results4 from "../../images/results4.jpg";
import results5 from "../../images/results5.jpg";
import results6 from "../../images/results6.jpg";
import results7 from "../../images/results7.jpg";
import results8 from "../../images/results8.jpg";
import results9 from "../../images/results9.jpg";
import results10 from "../../images/results10.jpg";
import results11 from "../../images/results11.jpg";
import results12 from "../../images/results12.jpg";
import insiderVideo from "../../images/jochum.mp4";


const Landing = () => (
  <div className="landing-page landingContain">

    <LandingCarousel />

    <Spacer link={"program"} />
    <Row className="my-5 mx-0 results-row2 reverse">
      <Col xs="12" md="7" className="no-padding">
        <div className="results-contain2 results1">
          <img src={individualized} alt="strength results" />
        </div>
      </Col>
      <Col xs="12" md="5" className="d-flex align-items-center justify-content-center no-padding">
        <div className="sign-up-info py-5">
          <h2 className="sign-up-title text-center">Individualized Programs</h2>
          <ul>
            <li>Custom 3-Week Professional Programs</li>
            <li>100's of Exercises</li>
            <li>Video Links</li>
            <li>Weight Tracking</li>
            <li>Weekly Check-Ins</li>
          </ul>
        </div>
      </Col>
    </Row>

    <Spacer link={"results"} />
    <Row
      className="d-flex justify-content-center align-items-center no-padding"
      style={{ minHeight: "calc(100vh - 66px)", width: "100%" }}
    >
      <Results />
    </Row>


    <Spacer link={"details"} />
    {/* <Row
         className="d-flex justify-content-center align-items-center no-padding"
         style={{ minHeight: "calc(100vh - 66px)", width: "100%" }}
      >
         <div className="px-3">
            <video controls style={{ width: "100%", maxWidth: "1000px" }} >
               <source src={insiderVideo} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
         </div>
      </Row> */}
    <Row
      className="d-flex justify-content-center align-items-center no-padding"
      style={{ minHeight: "calc(100vh - 66px)", width: "100%" }}
    >
      <Details />
    </Row>

    <Spacer link={"more-results"} />
    <ResultsCarousel />

    <Spacer link="signUp" />
    <SignUp />
    <Footer />
  </div >
);

const Spacer = ({ link }) => <div id={`${link}`} style={{ height: "66px", display: "block", width: "100%" }}></div>

const LandingCarousel = () => (
  <div className="splash">
    <Carousel indicators={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel5}
          alt="First slide"
        />
        <Carousel.Caption>
          <h2 className="onlineTitle">Jochum Strength Insider</h2>
          <p>Individualized Training programs</p>
          <a href="#program" className="carousel-learn-button">Learn more</a>
        </Carousel.Caption>
        <div className="carousel-more">
          <a className="joinTitle" href="/subscribe">Join Jochum Strength Insider!</a>
        </div>
      </Carousel.Item>


      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel6}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h2 className="onlineTitle">Jochum Strength Insider</h2>
          <p>Results!</p>
          <a href="#results" className="carousel-learn-button">Learn more</a>
        </Carousel.Caption>
        <div className="carousel-more">
          <a className="joinTitle" href="/subscribe">Join Jochum Strength Insider!</a>
        </div>
      </Carousel.Item>


      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel4}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h2 className="onlineTitle">Jochum Strength Insider</h2>
          <p>Weekly Exercise, Diet and Program Review</p>
          <a href="#details" className="carousel-learn-button">Learn more</a>
        </Carousel.Caption>
        <div className="carousel-more">
          <a className="joinTitle" href="/subscribe">Join Jochum Strength Insider!</a>
        </div>
      </Carousel.Item>
    </Carousel>
  </div>
);

const ResultsCarousel = () => (
  <div className="d-flex justify-content-center align-items-center contain px-2">
    <div className="results-carousel">
      {/* <h2>Results</h2> */}
      <Carousel className="mt-2">
        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results4}
              alt="First slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results5}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results6}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results7}
              alt="First slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results8}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results9}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results10}
              alt="First slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results11}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="img-wrapper">
            <img
              className="d-block w-100"
              src={results12}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  </div>
);


const Details = () => (
  <div>
    <Col className="mx-0 px-2" style={{ maxWidth: "1000px", width: "100%", display: "block" }}>
      <div className="px-3 mt-5">
        <video controls style={{ width: "100%", maxWidth: "1000px" }} >
          <source src={insiderVideo} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
      </div>
      <div className="details">
        <h3 className="detailsTitle mb-3 mx-0" style={{ width: "100%", display: "block" }}>The Details</h3>
        <p>At Jochum Strength we specialize in creating the best possible human we can. We are one of the only elite training services to offer an online programming service. This online programming allows you to have all the access to the Jochum Strength Programming and Coaching you would receive in person, all at the convenience of your own gym. These online programs are made to get you to your goal, whether that be fat-loss, muscle gain, becoming more athletic, staying healthy or feeling better. We are one of the few science backed training programs that will use the cutting edge of strength and conditioning techniques to get you to where you need to go.  A program includes the following:</p>
        <p> <b>Online Program</b>: All of your liftings, mobility and athletic movements programmed for you and your needs and accessible at the touch of your fingers. Every exercise is linked to a video to demonstrate how to perform the exercise. </p>
        <p> <b>Diet Guidelines</b>: These are the Jochum Strength Diet Guidelines that we use with all of our clients. The goal is to teach our clients how to fish, not fish for them. These guidelines are there to give you set rules that you can apply to your life style!</p>
        <p><b>Weekly Check In's</b>: Every single week you will have a online review session with a Jochum Strength coach to go over the previous weeks lifts, diet and life. We tailor these to what you need. Struggling with diet? We will focus on that. Need a form check? We will review videos. Just need some motivation to attack the next week? We got you for that as well!</p>
      </div>
    </Col>
  </div>
)

const Results = () => (
  <>
    <Row className="mx-0">

      <Col xs={12} md={6} className="results-card px-3 mb-3">
        <div className="results-card">
          <img src={results1} alt="results card" />
          <div className="results-card-body">
            <div className="results-card-body-inner">
              <h3>Jack Klein</h3>
              <div className="testimonial">
                <p>"I signed up for a program and I started looking forward to working out. They are challenging, new and push you and Austin really holds you accountable to make sure you stay on the path"</p>
                <p>Results: Lost 50 lbs, feels and moves better and gained strength.</p>
              </div>
              <div className="results-more d-flex justify-content-center">
                <div>
                  <div>More Results</div>
                  <div className="results-arrow d-flex justify-content-center">
                    <a href="#more-results" className="more-arrow">╲╱</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>

      <Col xs={12} md={6} className="results-card px-3">
        <div className="results-card">
          <img src={results2} alt="results card" />
          <div className="results-card-body">
            <div className="results-card-body-inner">
              <h3>Steven Bruggenthies</h3>
              <div className="testimonial">
                <p>"It's more than just a strength program, it's a family. Once you enter the program the goal is come out a different and better person. As much as you're willing to give him he is willing to put back into you"</p>
                {/* <p>2019 Transformation Contest Champion</p> */}
                <p>Results: -20 lbs, Dropped Body Fat, Gained Muscle, Added 60lbs to his Squat</p>
              </div>
              <div className="results-more d-flex justify-content-center">
                <div>
                  <div>More Results</div>
                  <div className="results-arrow d-flex justify-content-center">
                    <a href="#more-results" className="more-arrow">╲╱</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </>
);

export default Landing;