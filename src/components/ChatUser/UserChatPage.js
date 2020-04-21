import React, { useContext } from 'react';
import { compose } from 'recompose';

import ChatMessages from '../Chat';

import {
   AuthUserContext,
   withAuthorization,
   withEmailVerification,
} from '../Session';

const style = { width: "100%", maxWidth: "1000px", flex: "1" };

const UserChatPage = () => {
   const authUser = useContext(AuthUserContext);
   const unread = authUser.unread;

   return (
      <>
         <div className="d-flex justify-content-center">
            <div style={style}>
               <h1>Messages</h1>
               <ChatMessages authUser={authUser} roomId={authUser.uid} unreadCount={unread} setUnread={"unread"} setPartnerUnread={"adminUnread"} />
            </div>
         </div>
      </>
   )
};

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(UserChatPage);