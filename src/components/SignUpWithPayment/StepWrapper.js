import React, { useState } from 'react';
import join from '../../images/jochum-joy-b-w.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StepForm from './StepForm';
import Dots from './Dots';

const StepWrapper = () => {
  const [step, setStep] = useState(1);

  const next = () => {
    setStep(step >= 2 ? 3 : step + 1);
  }

  const prev = () => {
    setStep(step <= 1 ? 1 : step - 1);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col
            className="container-info px-0"
            xs={12}
            xl={{ span: 6, offset: 6 }}
          >
            <Dots step={step} />
            <div className='px-5 py-5 d-flex align-items-center justify-content-center'>
              <StepForm step={step} next={next} prev={prev} />
            </div>
          </Col>
        </Row>
        <div className="container-image" style={{ backgroundImage: `url(${join})` }}></div>
      </Container>
    </>
  )
};

export default StepWrapper;