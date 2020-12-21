import React, { useContext } from 'react';


import ChatMessages from './Chat';

import {
  AuthUserContext,
} from '../Session';

const ChatRoom = ({ user }) => {

  const authUser = useContext(AuthUserContext);
  const style = { height: "100%", width: "100%", maxWidth: "1000px", flex: "1" };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div style={style}>
          <ChatMessages authUser={authUser} roomId={user.uid} />
        </div>
      </div>
    </>
  )
};

export default ChatRoom;