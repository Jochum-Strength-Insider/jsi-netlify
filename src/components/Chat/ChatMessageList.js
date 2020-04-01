import React from 'react';
import MessageItem from './ChatMessageItem';

// import ListGroup from 'react-bootstrap/ListGroup';
// import Container from 'react-bootstrap/Container';

const MessageList = ({ authUser, onRemoveMessage, messages }) => (
   < >
      {messages.map((message, idx) => {

         const nextIndex = messages[idx + 1] ? idx + 1 : idx;
         const prevIndex = messages[idx - 1] ? idx - 1 : idx;
         const showName = (messages[prevIndex].userId !== message.userId) || (idx === 0) ? true : false;
         const showDate = (messages[nextIndex].userId !== message.userId) || (idx === messages.length - 1) ? true : false;

         // const timeBetween = Math.floor((message.createdAt / 1000) - (messages[prevIndex].createdAt / 1000));
         // const showTimeBetween = timeBetween > 3600 ? true : false;
         // console.log(showTimeBetween, timeBetween);

         // const timeSince = Math.floor((Date.now() / 1000) - (message.createdAt / 1000));
         // const showRecentDate = timeSince < 180 ? false : true;

         return (
            <MessageItem
               authUser={authUser}
               key={message.uid}
               message={message}
               onRemoveMessage={onRemoveMessage}
               showName={showName}
               showDate={showDate}
            // onEditMessage={onEditMessage}
            />
         )
      })}
   </>
);

export default React.memo(MessageList);