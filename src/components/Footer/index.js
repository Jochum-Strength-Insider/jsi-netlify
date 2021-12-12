import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import instagram from '../../images/instagram.svg';
import linkedIn from '../../images/linked-in.svg';

const Footer = () => {
   return (
      <>
         <Container fluid className="text-center text-md-left">
            <Row className="row py-3 bg-gray  py-5">
               <Col className="d-flex justify-content-center">
                  <div>
                     <h3 className="text-uppercase">AUSTIN JOCHUM</h3>
                     <div>151 Silver Lake Road NW</div>
                     <div>St. Paul, MN 55112</div>
                     <a href="https://www.google.com/maps/place/151+Silver+Lake+Rd+NW,+St+Paul,+MN+55112/@45.0510021,-93.2197169,17z/data=!3m1!4b1!4m5!3m4!1s0x52b32eeda2aa6a2b:0x702073d6ec5219b1!8m2!3d45.0510021!4d-93.2175282">Google Maps</a>
                     <br />
                     <div>Tel: 320-237-4970</div>
                     <br />
                     <div>jochumstrength@gmail.com</div>
                     <br />

                     <div className="d-md-inline-flex justify-content-center">
                        <a href="https://www.linkedin.com/in/austin-jochum-451966108/" data-content="https://www.linkedin.com/in/austin-jochum-451966108/" data-type="external" rel="noopener" id="comp-im4vq6q60imagelink">
                           <img style={{ height: "35px", width: "35px", color: "white" }} id="comp-im4vq6q60imageimageimage" alt="White LinkedIn Icon" data-type="image" src={linkedIn} />
                        </a>
                        <a href="https://www.instagram.com/austinjochum/" data-content="https://www.instagram.com/austinjochum/" data-type="external" rel="noopener" id="comp-im4vq6q61imagelink">
                           <img style={{ height: "35px", width: "35px", color: "white" }} id="comp-im4vq6q61imageimageimage" alt="White Instagram Icon" data-type="image" src={instagram} />
                        </a>
                     </div>

                  </div>
               </Col>
               <hr className="clearfix w-100 d-md-none pb-3 white"></hr>
               <Col className="d-flex justify-content-center">
                  <div>
                     <div>
                        <h5 className="text-uppercase">Site By Sean Neppl</h5>
                        <div>sean.e.neppl@gmail.com</div>
                        <a href="https://www.seanneppl.com">www.seanneppl.com</a>
                     </div>
                  </div>
               </Col>
            </Row>
            <Row className="bg-gray-light footer-copyright text-center py-3">
               <Col>© 2020 Copyright: <a href="https://www.jochumstrength.com/">Jochum Strength</a></Col>
            </Row>
         </Container>
      </>
   )
}

export default Footer;