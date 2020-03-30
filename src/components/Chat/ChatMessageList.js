
//MessageList
import React from 'react';
import MessageItem from './ChatMessageItem';

// import ListGroup from 'react-bootstrap/ListGroup';
// import Container from 'react-bootstrap/Container';

const MessageList = ({ authUser, onRemoveMessage, messages }) => (
   < >
      {messages.map((message, idx) => {

         return (
            <MessageItem
               authUser={authUser}
               key={message.uid}
               message={message}
               onRemoveMessage={onRemoveMessage}
            // onEditMessage={onEditMessage}
            />
         )
      })}
   </>
);

export default MessageList;