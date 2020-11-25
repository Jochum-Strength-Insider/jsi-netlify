
import React from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';

import Codes from '../Codes';
import Container from 'react-bootstrap/Container';

const CreateCodes = () => {
  return (
    <>
      <Container fluid>
        <div className="app-top d-flex justify-content-center">
          <div className="contain-width">
            <h3>Referrals and Discounts</h3>
            <Codes />
          </div>
        </div>
      </Container>
    </>
  )
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
  withAuthorization(condition),
)(CreateCodes);
