import React, { useContext, useState } from 'react';
import { compose } from 'recompose';
import { Switch, Route, useParams } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import ChatMessages from '../Chat';

import {
   AuthUserContext,
   withAuthorization,
   withEmailVerification,
} from '../Session';

import { withFirebase } from '../Firebase';

const ChatRoomBase = ({ location, firebase }) => {
   const userFromLocationState = location.state ? location.state.user : null;
   const [user, setUser] = useState(userFromLocationState);

   const authUser = useContext(AuthUserContext);
   const { uid } = useParams();

   if (!user) {
      firebase.user(uid).once("value").then(snap => {
         const userObject = snap.val();
         if (userObject) {
            setUser(userObject);
         }
      });
   }

   const unread = user ? user.adminUnread : 0;
   const style = { width: "100%", maxWidth: "1000px", flex: "1" };

   // let match = useRouteMatch();
   return (
      <>
         <div className="d-flex justify-content-center">
            <div style={style}>
               <ChatMessages authUser={authUser} roomId={uid} unreadCount={unread} setUnread={"adminUnread"} setPartnerUnread={"unread"} />
            </div>
         </div>
      </>
   )
};

const ChatRoom = withFirebase(ChatRoomBase);

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

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(AdminChatPage);

export { ChatRoom };