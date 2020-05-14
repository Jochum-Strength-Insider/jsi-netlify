import React, { memo } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import Toast from 'react-bootstrap/Toast';
// import Button from 'react-bootstrap/Button';

import { withFirebase } from "../Firebase";

const ChatToastsBase = memo(({ firebase, unread }) => {

   const onRemoveMessage = mid => {
      return firebase.adminUnreadMessage(mid).remove();
   };

   return (
      <>
         {console.log("render")}
         <div
            aria-live="polite"
            aria-atomic="true"
            style={{
               position: 'absolute',
               // minHeight: '200px',
               top: '66px',
               right: '15px',
               zIndex: "100",
            }}
         >
            <div
               style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
               }}
            >
               {
                  unread.length > 0 ? (
                     unread.map((message, idx) => <MessageToast key={idx} messageId={message.mid} message={message} onRemoveMessage={onRemoveMessage} />)
                  ) : (
                        null
                     )
               }
            </div>
         </div>
      </>
   )
});

const MessageToastBase = ({ message, onRemoveMessage, messageId }) => {

   const handleClose = () => {
      onRemoveMessage(messageId)
         .catch(error => console.log("error"));
   };

   return (
      <Toast onClose={handleClose} show={true} delay={3000} autohide>
         <Toast.Header>
            <strong className="mr-auto"><Link
               className="btn btn-link px-0 py-0"
               to={{
                  pathname: `${ROUTES.ADMIN}/${message.userId}`,
               }}
            >
               {message.username}
            </Link></strong>

            {/* <strong>{message.username}</strong> */}
            {/* <small>11 mins ago</small> */}
         </Toast.Header>
         <Toast.Body>
            {message.text}
         </Toast.Body>
      </Toast>
   );
}

const MessageToast = MessageToastBase;

const ChatToasts = withFirebase(ChatToastsBase);

export default ChatToasts;