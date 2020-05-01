import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';

import './style.css';

import carousel4 from "../../images/carousel4.jpg";
import carousel5 from "../../images/carousel5.jpg";
import carousel6 from "../../images/carousel6.jpg";
import individualized from "../../images/individualized.jpg";
import results1 from "../../images/results1.jpg";
import results2 from "../../images/results2.jpg";
import results3 from "../../images/results3.jpg";
import jochumJoin from "../../images/jochum-join.jpg";

// const SignUpButton = ({ link, children }) => (
//    <a href={link} className="signUpButton">{children}</a>
// )

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

      <Spacer link={"details"} />
      <Row className="d-flex justify-content-center align-items-center no-padding" style={{ minHeight: "calc(100vh - 66px)", width: "100%" }}>
         <Details />
      </Row>

      <Spacer link={"results"} />
      <Row className="d-flex justify-content-center align-items-center no-padding" style={{ minHeight: "calc(100vh - 66px)", width: "100%" }}>
         <Results2 />
      </Row>

      <Spacer link="signUp" />
      <SignUp />
   </div>
);

const Spacer = ({ link }) => <div id={`${link}`} style={{ height: "66px", display: "block", width: "100%" }}></div>

const LandingCarousel = () => (
   <Carousel indicators={false}>
      <Carousel.Item>
         <img
            className="d-block w-100"
            src={carousel4}
            alt="First slide"
         />
         <Carousel.Caption>
            <h2 className="onlineTitle">Jochum Strength Insider</h2>
            <p>Individualized Training programs</p>
            <a href="#program" className="carousel-learn-button">Learn more</a>
         </Carousel.Caption>
         <div className="carousel-more">
            <p className="joinTitle">Join Jochum Strength Insider!</p>
            <a href="#signUp" className="more-arrow">╲╱</a>
         </div>
      </Carousel.Item>

      <Carousel.Item>
         <img
            className="d-block w-100"
            src={carousel5}
            alt="Third slide"
         />
         <Carousel.Caption>
            <h2 className="onlineTitle">Jochum Strength Insider</h2>
            <p>Weekly Exercise, Diet and Program Review</p>
            <a href="#details" className="carousel-learn-button">Learn more</a>
         </Carousel.Caption>
         <div className="carousel-more">
            <p className="joinTitle">Join Jochum Strength Insider!</p>
            <a href="#signUp" className="more-arrow">╲╱</a>
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
            <p className="joinTitle">Join Jochum Strength Insider!</p>
            <a href="#signUp" className="more-arrow">╲╱</a>
         </div>
      </Carousel.Item>
   </Carousel>
);



const Details = () => (
   <div>
      <Col className="mx-0 px-0" style={{ maxWidth: "1000px", width: "100%", display: "block" }}>
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

const Results2 = () => (
   <>
      <h3 className="detailsTitle mb-3 mt-5 mx-0 text-center">Results</h3>
      <Row className="my-5 mx-0 results-row2">
         <Col xs="12" md="7" className="no-padding">
            <div className="results-contain2 results1">
               <img src={results1} alt="strength results" />
            </div>
         </Col>
         <Col xs="12" md="5" className="d-flex align-items-center no-padding">
            <div className="results-person2" >
               <p>"Jochum Strength provided me a system that I was easily able to follow to reach my fitness goals. After football I really wanted to lose weight, but couldn't find any motivation to do so and really didn't know what the next step was. I signed up for a program and I started looking forward to working out. They are challenging, new and push you and Austin really holds you accountable to make sure you stay on the path"</p>
               <p> - Jack Klein</p>
               <p>Results: Lost 50 lbs, feels and moves better and gained strength.</p>
            </div>
         </Col>
      </Row>

      <Row className="my-5 mx-0 results-row2 reverse">
         <Col xs="12" md="7" className="no-padding">
            <div className="results-contain2 results1">
               <img src={results2} alt="strength results" />
            </div>
         </Col>
         <Col xs="12" md="5" className="d-flex align-items-center no-padding">
            <div className="results-person2" >
               <p>"Jochum Strength is more than just a fitness program, Jochum Strength is about developing a complete human. It's more than just a strength program, it's a family. Once you enter the program the goal is come out a different and better person. As much as you're willing to give him he is willing to put back into you"</p>
               <p> - Steven Bruggenthies </p>
               <p>2019 Transformation Contest Champion</p>
               <p>Results: -20 lbs, Dropped Body Fat, Gained Muscle, Added 60lbs to his Squat</p>
            </div>
         </Col>
      </Row>

      <Row className="my-5 mx-0 results-row2">
         <Col xs="12" md="7" className="no-padding">
            <div className="results-contain2 results1">
               <img src={results3} alt="strength results" />
            </div>
         </Col>
         <Col xs="12" md="5" className="d-flex align-items-center no-padding">
            <div className="results-person2" >
               <p>"To me, Jochum Strength is a Lifestyle with a mantra of constant and never ending improvement. This goes beyond just physical improvement, but rather mental and really just all areas of your life."</p>
               <p> - Joey Puk</p>
               <p>Results Lost 20lbs, felt and moved better.</p>
            </div>
         </Col>
      </Row>

   </>
);

const SignUp = () => (
   <div className="sign-up mb-5">
      <img
         className="d-block w-100"
         src={jochumJoin}
         alt="Third slide"
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
)

export default Landing;


// {/* <Row>
//          <p>500 lbs. lost and counting</p>
//       </Row> */}

// {/* <Row className="d-flex my-3 justify-content-center">
//                <h3 className="text-center benefitsTitle">Program Benefits</h3>
//             </Row>
//             <Row className="d-flex justify-content-center benefitCircleContain">
//                <div>
//                   <div className="topRow d-flex justify-content-center">
//                      <div className="benefitCircle"><span></span><p>Increased Mental Focus</p></div>
//                      <div className="benefitCircle"><span></span><p>Stronger Body and Mind</p></div>
//                      <div className="benefitCircle"><span></span><p>Better Sports Performance</p></div>
//                   </div>
//                   <div className="d-flex justify-content-center bottomRow">
//                      <div className="benefitCircle"><span></span><p>Increased Athleticism</p></div>
//                      <div className="benefitCircle"><span></span><p>Better Mental and Physical Strength</p></div>
//                   </div>
//                </div>
//             </Row> */}

// {/* <Row className="d-flex justify-content-center mt-5 mb-3">
//                <h3 className="text-center whatDoesTitle">What Does <div><b>Jochum Strength</b></div> Mean To You?</h3>
//             </Row>
//             <Row className="d-flex mb-5 justify-content-center">
//                <video className="whatDoesVideo" controls>
//                   <source src="https://video.wixstatic.com/video/7acc02_e267dc20960e4f57b6af9d8e39b03d95/480p/mp4/file.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//                </video>
//             </Row> */}

// const Results = () => (
//    <div>
//       <h3 className="detailsTitle mb-3 text-center">Results</h3>
//       <Row className="mx-3 my-5 results-row">
//          <Col xs="12" md="9" className="no-padding">
//             <div className="results-contain results1">
//                <img src={results1} alt="strength results" />
//                <div className="results-info">
//                   <div >
//                      <p>"Jochum Strength provided me a system that I was easily able to follow to reach my fitness goals. After football I really wanted to lose weight, but couldn't find any motivation to do so and really didn't know what the next step was. I signed up for a program and I started looking forward to working out. They are challenging, new and push you and Austin really holds you accountable to make sure you stay on the path"</p>
//                   </div>
//                </div>
//             </div>
//          </Col>
//          <Col xs="12" md="3" className="d-flex align-items-end no-padding">
//             <div className="results-person pb-5" >
//                <p>Jack Klein</p>
//                <p>Results: Lost 50 lbs, feels and moves better and gained strength.</p>
//             </div>
//          </Col>
//       </Row>

//       <Row className="mx-3 my-5 results-row">
//          <Col xs="12" md="9" className="no-padding">
//             <div className="results-contain results2">
//                <img src={results2} alt="strength results" />
//                <div className="results-info">
//                   <div>
//                      <p>"Jochum Strength is more than just a fitness program, Jochum Strength is about developing a complete human. It's more than just a strength program, it's a family. Once you enter the program the goal is come out a different and better person. As much as you're willing to give him he is willing to put back into you"</p>
//                   </div>
//                </div>
//             </div>
//          </Col>
//          <Col xs="12" md="3" className="d-flex align-items-end no-padding" >
//             <div className="results-person pb-5" >
//                <p>Steven Bruggenthies 2019 Transformation Contest Champion</p>
//                <p>Results: -20 lbs, Dropped Body Fat, Gained Muscle, Added 60lbs to his Squat</p>
//             </div>
//          </Col>
//       </Row>

//       <Row className="mx-3 my-5 results-row">
//          <Col xs="12" md="9" className="no-padding">
//             <div className="results-contain results3">
//                <img src={results3} alt="strength results" />
//                <div className="results-info">
//                   <div >
//                      <p>"To me, Jochum Strength is a Lifestyle with a mantra of constant and never ending improvement. This goes beyond just physical improvement, but rather mental and really just all areas of your life."</p>
//                   </div>
//                </div>
//             </div>
//          </Col>

//          <Col xs="12" md="3" className="d-flex align-items-end no-padding">
//             <div className="results-person pb-5" >
//                <p>Joey Puk</p>
//                <p>Results Lost 20lbs, felt and moved better.</p>
//             </div>
//          </Col>
//       </Row>
//    </div>
// );