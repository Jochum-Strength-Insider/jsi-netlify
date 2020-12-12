import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./style.css";

const Video = () => (
  <div className="video-section">
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center no-padding"
      >
        <Col className="mx-0 px-0">
          <div className="videoWrapper">
            <iframe src='https://www.youtube.com/embed/1sccYISTRQs?controls=0'
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
            />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Video;