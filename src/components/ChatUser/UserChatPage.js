import React, { useContext } from 'react';
import { compose } from 'recompose';

import ChatMessages from '../Chat';

import {
   AuthUserContext,
   withAuthorization,
   withEmailVerification,
} from '../Session';


const UserChatPage = () => {
   const authUser = useContext(AuthUserContext);
   const unread = authUser.unread;

   return (
      <ChatMessages authUser={authUser} roomId={authUser.uid} unreadCount={unread} setUnread={"unread"} setPartnerUnread={"adminUnread"} />
   )
};

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(UserChatPage);