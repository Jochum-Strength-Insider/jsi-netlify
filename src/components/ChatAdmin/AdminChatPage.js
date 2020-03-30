import React, { useContext } from 'react';
import { compose } from 'recompose';
import { Switch, Route, useParams } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import ChatMessages from '../Chat';

import {
   AuthUserContext,
   withAuthorization,
   withEmailVerification,
} from '../Session';

const ChatRoom = ({ location }) => {
   const authUser = useContext(AuthUserContext);
   const { uid } = useParams();
   const { user } = location.state
   const unread = user ? user.adminUnread : 0;

   // let match = useRouteMatch();
   return (
      <ChatMessages authUser={authUser} roomId={uid} unreadCount={unread} setUnread={"adminUnread"} setPartnerUnread={"unread"} />
   )
};

const AdminChatPage = () => {
   return (
      <>
         {/* <h1>Admin Chat Page</h1> */}
         <Switch>
            <Route exact path={ROUTES.ADMIN_MESSAGES_USER} component={ChatRoom} />
         </Switch>
      </>
   )
};

const condition = authUser => !!authUser;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(AdminChatPage);