import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import { Switch, Route } from 'react-router-dom';

// import ChatToasts from '../ChatToasts';

import * as ROUTES from '../../constants/routes';

import AdminPanel from '../AdminPanel'

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';

const AdminPage = ({ firebase }) => {
   const usersInit = JSON.parse(localStorage.getItem('users')) || [];
   const [usersList, setUsersList] = useState(usersInit);
   // const [unread, setUnread] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      firebase.users().on('value', snapshot => {
         const usersObject = snapshot.val();
         if (usersObject) {
            const usersList = Object.keys(usersObject).map(key => ({
               ...usersObject[key],
               uid: key,
            }));

            localStorage.setItem('users', JSON.stringify(usersList));
            setUsersList(usersList);
            setLoading(false);
         } else {
            localStorage.removeItem('users');
            setLoading(false);
         }
      });

      // firebase.adminUnreadMessages().limitToLast(5).on('value', snapshot => {
      //    const unreadObject = snapshot.val();
      //    if (unreadObject) {
      //       const unreadList = Object.keys(unreadObject).map(key => ({
      //          ...unreadObject[key],
      //          mid: key,
      //       }));

      //       console.log("unreadList", unreadList);
      //       setUnread(unreadList);
      //       setLoading(false);
      //    } else {
      //       setUnread([])
      //       console.log("no unread messages");
      //       setLoading(false);
      //    }
      // });

      return () => {
         firebase.users().off();
         // firebase.adminUnreadMessages().off();
      };
   }, [firebase]);

   return (
      <>
         {/* <ChatToasts unread={unread} /> */}
         <Switch>
            <Route path={ROUTES.ADMIN_DETAILS} children={<AdminPanel usersList={usersList} loading={loading} />} />
            <Route exact path={ROUTES.ADMIN} children={<AdminPanel usersList={usersList} loading={loading} />} />
         </Switch>
      </>
   )
};

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withEmailVerification,
   withFirebase,
   withAuthorization(condition),
)(AdminPage);
