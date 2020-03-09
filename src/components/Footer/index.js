import React from 'react';

// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// import logo from '../../images/logo.png'

const Footer = () => {
   return (

      <>
         <Container fluid className="bg-gray text-center text-md-left">

            <Row className="row py-3">

               {/* <Col md="6" className="mt-md-0 mt-3m"> */}

               <Col className="d-flex justify-content-center">
                  <div>
                     <h5 className="text-uppercase">AUSTIN JOCHUM</h5>
                     <div>151 Silver Lake Road NW</div>
                     <div>St. Paul, MN 55112</div>
                     <a href="https://www.google.com/maps/place/151+Silver+Lake+Rd+NW,+St+Paul,+MN+55112/@45.0510021,-93.2197169,17z/data=!3m1!4b1!4m5!3m4!1s0x52b32eeda2aa6a2b:0x702073d6ec5219b1!8m2!3d45.0510021!4d-93.2175282">Google Maps</a>
                     <br />
                     <div>Tel: 320-237-4970</div>
                     <br />
                     <div>jochumstrength@gmail.com</div>
                  </div>
               </Col>

               <hr className="clearfix w-100 d-md-none pb-3"></hr>

               <Col className="d-flex justify-content-center">
                  <div>
                     <h5 className="text-uppercase">Site By Sean Neppl</h5>
                     <div>sean.e.neppl@gmail.com</div>
                     <div>www.seanneppl.com</div>
                  </div>
               </Col>

               {/* <Col md="6" className="mb-md-0 mb-6">

                  <h5 className="text-uppercase">Links</h5>

                  <ul className="list-unstyled">
                     <li>
                        <a href="#!">Link 1</a>
                     </li>
                     <li>
                        <a href="#!">Link 2</a>
                     </li>
                     <li>
                        <a href="#!">Link 3</a>
                     </li>
                     <li>
                        <a href="#!">Link 4</a>
                     </li>
                  </ul>
               </Col> */}

            </Row>
            <Row className="bg-gray-light footer-copyright text-center py-3">
               <Col>© 2020 Copyright: <a href="https://www.jochumstrength.com/">Jochum Strength</a></Col>
            </Row>
         </Container>

      </>
   )
}

export default Footer;