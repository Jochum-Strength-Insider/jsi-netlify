import React, { useEffect } from 'react';

import { SignInLink } from '../SignIn';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import logo from '../../images/logo.png';

const Landing = () => {

   useEffect(() => {
      document.body.classList.add('bg-purple');
      return () => document.body.classList.remove('bg-purple');
   }, [])

   return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
         <div>
            <Row className="d-flex justify-content-center">
               <Image
                  src={logo}
                  alt="Jochum Strength Logo"
                  fluid
               />
            </Row>
            <Row className="d-flex justify-content-center" style={{ color: "white" }}>
               <h1>KEEP CHOPPIN' WOOD</h1>
            </Row>
            <Row className="d-flex justify-content-center">
               <SignInLink color={"gray"} />
            </Row>
         </div>
      </Container >
   )
};

export default Landing;
