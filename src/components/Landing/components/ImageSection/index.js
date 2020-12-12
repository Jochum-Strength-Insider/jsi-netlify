import React, { Component } from "react";
import './style.css';

import jochumJoin from "../../../images/jochum-join.jpg";


// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export class ImageSection extends Component {
  render() {
    return (
      <>
        <div className='dedicated' style={{ backgroundImage: `url(${jochumJoin})` }}>
          <div className="dedicated_container">
            <div className="dedicated_block">
              <h2 className="dedicated_title">Hearth is dedicated to helping you grow your businesses and protect your profits.</h2>
              <p className="dedicated_body">Our team will teach you how to offer financing as part of your sales process and we’re here to answer any questions you or your customers have with a quick call, text, or email.</p>
              <a href="/contractors/financing" className="h-button-blue caps button-dedicated w-button">Get STARTED</a>
            </div>
          </div>
        </div>

        {/* <header>
          <div className="intro">
            <div className="overlay">
              <Container>
                <Row>
                  <Col className="intro-text">
                    <h1>
                      {this.props.data ? this.props.data.title : "Loading"}
                      <span></span>
                    </h1>
                    <p>
                      {this.props.data ? this.props.data.paragraph : "Loading"}
                    </p>
                    <a
                      href="#features"
                      className="btn btn-custom btn-lg page-scroll"
                    >
                      Learn More
                  </a>{" "}
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </header > */}
      </>
    );
  }
}

export default ImageSection;
