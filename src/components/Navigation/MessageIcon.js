import React, { useState, useEffect } from 'react';
import { onValue, child } from "firebase/database";

import { withFirebase } from '../Firebase';

import Badge from 'react-bootstrap/Badge';

const MessageIconBase = ({ firebase, uid }) => {
  const [unread, setUnread] = useState([]);
  useEffect(() => {
    const unreadQueryRef = child(firebase.user(uid), 'undread');
    onValue(unreadQueryRef, (snapshot) => {
      const unreadObject = snapshot.val();
        if (unreadObject) {
          const unreadList = Object.keys(unreadObject).reverse().map(key => ({
            ...unreadObject[key],
            mid: key,
          }));
          setUnread(unreadList);
        } else {
          setUnread([])
        }
    });
    return () => {
      // unreadQueryRef.off();
    };
  }, [firebase, uid]);

  return (
    <div className="user-unread d-block d-md-none">
      <svg className="user-unread-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z" /></svg>

      {(unread.length > 0) &&
        <div>
          <Badge>{unread.length}</Badge>
          <span className="sr-only">unread messages</span>
        </div>
      }
    </div>
  )
};

export default withFirebase(MessageIconBase);