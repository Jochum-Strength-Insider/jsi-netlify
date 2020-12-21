import React, { useContext } from 'react';
import { compose } from 'recompose';

import ChatMessages from './Chat';
import Container from 'react-bootstrap/Container';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';

const UserChatPage = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <>
      <Container fluid>
        <div className="app-top d-flex justify-content-center">
          <div className="contain-width">
            <ChatMessages authUser={authUser} roomId={authUser.uid} />
          </div>
        </div>
      </Container>
    </>
  )
};

const condition = authUser => !!authUser && authUser.ACTIVE;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(UserChatPage);