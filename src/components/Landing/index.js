import React from 'react';

// import { SignInLink } from '../SignIn';

// import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import logo from '../../images/logo.png';

// const Landing = () => {

//    useEffect(() => {
//       document.body.classList.add('bg-purple');
//       return () => document.body.classList.remove('bg-purple');
//    }, [])

//    const logo = 'https://static.wixstatic.com/media/d44628_dd09c48b517b41fc9d04671db909b022~mv2.png/v1/fill/w_848,h_296,al_c,lg_1,q_85/jochum2%20white.webp';

//    return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
//          <div>
//             <Row className="d-flex justify-content-center">
//                <Image
//                   src={logo}
//                   alt="Jochum Strength Logo"
//                   fluid
//                />
//             </Row>
//             <Row className="d-flex justify-content-center" style={{ color: "white" }}>
//                <h1>KEEP CHOPPIN' WOOD</h1>
//             </Row>
//             <Row className="d-flex justify-content-center">
//                <SignInLink color={"gray"} />
//             </Row>
//          </div>
//       </Container >
//    )
// };

const SignUpButton = ({ link, children }) => (
   <a href={link} className="signUpButton">{children}</a>
)

const Landing = () => (
   <Container className="landingContain">
      {/* <div> */}
      <Row className="d-flex justify-content-center pt-3 pb-3">
         <h1 className="onlineTitle">VIP Online Programming</h1>
      </Row>

      <Row className="d-flex justify-content-center">
         <div >
            <p className="joinTitle">Join Jochum Strength's online training program!</p>
            <p>Includes:</p>
            <ul>
               <li>Nutrition Guidelines and Diet Sheets</li>
               <li>Individualized Training Program</li>
               <li>Access to Jochum Strength Resources <br /> (Exercise Index, Facebook Group, Q/A, Ect.)</li>
               <li>Weekly Exercise, Diet and Program Review</li>
            </ul>
            <p>Once You Sign Up you will be emailed by Coach Jochum and the programming process will begin!</p>
            <p className="info"><i>*This program will be automatically charged every three weeks until you decide to cancel. You are paying a subscription-based fee for access to Jochum Strength Content including programming, nutriton and advice*</i></p>
         </div>
      </Row>


      <Row className="d-flex justify-content-center mt-3 mb-5">
         <SignUpButton link={"https://www.jochumstrength.com/program-signup"}>Sign Up</SignUpButton>
      </Row>

      {/* <Row>
         <p>500 lbs. lost and counting</p>
      </Row> */}

      <Row className="d-flex my-3 justify-content-center">
         <h3 className="text-center benefitsTitle">Program Benefits</h3>
      </Row>
      <Row className="d-flex justify-content-center benefitCircleContain">
         <div>
            <div className="topRow d-flex justify-content-center">
               <div className="benefitCircle"><span></span><p>Increased Mental Focus</p></div>
               <div className="benefitCircle"><span></span><p>Stronger Body and Mind</p></div>
               <div className="benefitCircle"><span></span><p>Better Sports Performance</p></div>
            </div>
            <div className="d-flex justify-content-center bottomRow">
               <div className="benefitCircle"><span></span><p>Increased Athleticism</p></div>
               <div className="benefitCircle"><span></span><p>Better Mental and Physical Strength</p></div>
            </div>
         </div>
      </Row>

      <Row className="d-flex justify-content-center mt-5 mb-3">
         <h3 className="text-center whatDoesTitle">What Does <div><b>Jochum Strength</b></div> Mean To You?</h3>
      </Row>
      <Row className="d-flex mb-5 justify-content-center">
         <video className="whatDoesVideo" controls>
            <source src="https://video.wixstatic.com/video/7acc02_e267dc20960e4f57b6af9d8e39b03d95/480p/mp4/file.mp4" type="video/mp4" />
            Your browser does not support the video tag.
         </video>
      </Row>

      <Row>
         <h3 className="detailsTitle mb-3">The Details</h3>
         <p>At Jochum Strength we specialize in creating the best possible human we can. We are one of the only elite training services to offer an online programming service. This online programming allows you to have all the access to the Jochum Strength Programming and Coaching you would receive in person, all at the convenience of your own gym. These online programs are made to get you to your goal, whether that be fat-loss, muscle gain, becoming more athletic, staying healthy or feeling better. We are one of the few science backed training programs that will use the cutting edge of strength and conditioning techniques to get you to where you need to go.  A program includes the following:</p>
         <p> <b>Online Program</b>: All of your liftings, mobility and athletic movements programmed for you and your needs and accessible at the touch of your fingers. Every exercise is linked to a video to demonstrate how to perform the exercise. </p>
         <p> <b>Diet Guidelines</b>: These are the Jochum Strength Diet Guidelines that we use with all of our clients. The goal is to teach our clients how to fish, not fish for them. These guidelines are there to give you set rules that you can apply to your life style!</p>
         <p><b>Weekly Check In's</b>: Every single week you will have a online review session with a Jochum Strength coach to go over the previous weeks lifts, diet and life. We tailor these to what you need. Struggling with diet? We will focus on that. Need a form check? We will review videos. Just need some motivation to attack the next week? We got you for that as well!</p>
      </Row>
      <Row className="my-5 pb-5 d-flex justify-content-center">
         <SignUpButton link={"https://www.jochumstrength.com/program-signup"}>Sign Up</SignUpButton>
      </Row>
      {/* </div> */}
   </Container >
);

export default Landing;
