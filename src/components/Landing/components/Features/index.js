import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './style.css';

// const data = {
//   "Header": {
//     "title": "We are a Landing Page",
//     "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum."
//   },
//   "About": {
//     "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     "Why": [
//       "Lorem ipsum dolor",
//       "Tempor incididunt",
//       "Lorem ipsum dolor",
//       "Incididunt ut labore"
//     ],
//     "Why2": [
//       "Aliquip ex ea commodo",
//       "Lorem ipsum dolor",
//       "Exercitation ullamco",
//       "Lorem ipsum dolor"
//     ]
//   },
//   "Services": [
//     {
//       "icon": "fas fa-dumbbell",
//       "name": "Lorem ipsum dolor",
//       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
//     },
//     {
//       "icon": "fa fa-cart-arrow-down",
//       "name": "Consectetur adipiscing",
//       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
//     },
//     {
//       "icon": "fa fa-cloud-download",
//       "name": "Lorem ipsum dolor",
//       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
//     },
//     {
//       "icon": "fa fa-language",
//       "name": "Consectetur adipiscing",
//       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
//     },
//     {
//       "icon": "fa fa-plane",
//       "name": "Lorem ipsum dolor",
//       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
//     },
//     {
//       "icon": "fa fa-pie-chart",
//       "name": "Consectetur adipiscing",
//       "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
//     }
//   ],
//   "Testimonials": [
//     {
//       "img": "img/testimonials/01.jpg",
//       "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
//       "name": "John Doe"
//     },
//     {
//       "img": "img/testimonials/02.jpg",
//       "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
//       "name": "Johnathan Doe"
//     },
//     {
//       "img": "img/testimonials/03.jpg",
//       "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
//       "name": "John Doe"
//     },
//     {
//       "img": "img/testimonials/04.jpg",
//       "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
//       "name": "Johnathan Doe"
//     },
//     {
//       "img": "img/testimonials/05.jpg",
//       "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
//       "name": "John Doe"
//     },
//     {
//       "img": "img/testimonials/06.jpg",
//       "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
//       "name": "Johnathan Doe"
//     }
//   ],
//   "Team": [
//     {
//       "img": "img/team/01.jpg",
//       "name": "John Doe",
//       "job": "Director"
//     },
//     {
//       "img": "img/team/02.jpg",
//       "name": "Mike Doe",
//       "job": "Senior Designer"
//     },
//     {
//       "img": "img/team/03.jpg",
//       "name": "Jane Doe",
//       "job": "Senior Designer"
//     },
//     {
//       "img": "img/team/04.jpg",
//       "name": "Karen Doe",
//       "job": "Project Manager"
//     }
//   ],
//   "Contact": {
//     "address": "4321 California St, San Francisco, CA 12345 ",
//     "phone": "+1 123 456 1234",
//     "email": "info@company.com",
//     "facebook": "fb.com",
//     "twitter": "twitter.com",
//     "youtube": "youtube.com"
//   },
// }

const featuresData = [
  {
    "icon": "fas fa-comments",
    "title": "One on One",
    "text": "Every single week you will have an online review session with a Jochum Strength coach."
  },
  {
    "icon": "fas fa-dumbbell",
    "title": "Programs",
    "text": "Individualzized programs, utilizing 100's of exercises, that fit your goals."
  },
  {
    "icon": "fas fa-weight",
    "title": "Diet Sheets",
    "text": "Access to the Jochum Strength Diet Guidelines that we use with all of our clients."
  },
  {
    "icon": "fas fa-mobile",
    "title": "Mobile Experience",
    "text": "All of your lifting, mobility, and athletic movements programmed for you at the touch of your fingers."
  }
]

export class features extends Component {
  render() {
    return (
      <div id="features" className="text-center">
        <Container fluid>
          <Row>
            <Col md={12} className="section-title">
              <h2>Features</h2>
            </Col>
          </Row>
          <Row>
            {featuresData
              ? featuresData.map((d, i) => (
                <Col key={`${d.title}-${i}`} xs={12} sm={6} md={3}>
                  {" "}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </Col>
              ))
              : "Loading..."}
          </Row>
        </Container>
      </div>
    );
  }
}

export default features;
