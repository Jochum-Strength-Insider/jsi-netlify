import React from 'react';

import SignUp from './components/InsiderSignUp';
import Footer from '../Footer';
import LandingCarousel from './components/LandingCarousel';
import FlickingCarousel from './components/FlickingCarousel';
import ResultsCards from './components/ResultsCards';
import Details from './components/Details';
import IndividualProgram from './components/IndividualProgram';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Video from './components/Video';

import './style.css';

const Landing = () => (
  <div className="landing-page landingContain">
    <LandingCarousel />
    <Features />
    <IndividualProgram />
    <ResultsCards />
    <CallToAction />
    <Video />
    <Details />
    <FlickingCarousel />
    <SignUp />
    <Footer />
  </div >
);



export default Landing;