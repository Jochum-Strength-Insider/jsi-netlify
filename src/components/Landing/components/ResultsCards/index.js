import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import results1 from "../../../../images/results1.jpg";
import results2 from "../../../../images/results2.jpg";

import './style.css';

const ResultCardRedesign = () => {
  return (
    <section id="results" className="text-center">
      <Container>
        <Row>
          <Col xs={12} className="results-title">
            <h2>Results</h2>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Card className="card-first">
              <Card.Img variant="top" src={results2} />
              <Card.Body>
                <Card.Title><h3>Steven Bruggenthies</h3></Card.Title>
                <Card.Text>
                  'It's more than just a strength program, it's a family. Once you enter the program the goal is come out a different and better person. As much as you're willing to give him he is willing to put back into you'
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card>
              <Card.Img variant="top" src={results1} />
              <Card.Body>
                <Card.Title><h3>Jack Klein</h3></Card.Title>
                <Card.Text>
                  'I signed up for a program and I started looking forward to working out. They are challenging, new and push you and Austin really holds you accountable to make sure you stay on the path'
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ResultCardRedesign;