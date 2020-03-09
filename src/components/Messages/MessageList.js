//MessageList
import React from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ authUser, onRemoveMessage, messages, onEditMessage }) => (
   <ul>
      {messages.map(message => (
         <MessageItem
            authUser={authUser}
            key={message.uid}
            message={message}
            onRemoveMessage={onRemoveMessage}
            onEditMessage={onEditMessage}
         />
      ))}
   </ul>
);

export default MessageList;