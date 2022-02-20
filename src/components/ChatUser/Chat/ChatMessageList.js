import React from 'react';
import MessageItem from './ChatMessageItem';

import moment from 'moment';

const MessageList = ({ authUser, onRemoveMessage, messages }) => {
   const oneDay = 86400000;
   const now = moment();

   const daysArray = messages.map(message => moment(message.createdAt).startOf("D").format("MMM DD"));

   const days = [...new Set(daysArray)];

   const uniqueDayIndex = days.map(day => daysArray.findIndex(el => el === day))
   const uniqueDayEndIndex = days.map(day => daysArray.lastIndexOf(day))

   return (
      <>
         {messages.map((message, idx) => {

            const first = (idx === 0);
            const last = (idx === (messages.length - 1));

            const nextIndex = messages[idx + 1] ? idx + 1 : idx;
            const prevIndex = messages[idx - 1] ? idx - 1 : idx;
            const nextMessage = messages[nextIndex];
            const prevMessage = messages[prevIndex];
            const showName = (prevMessage.userId !== message.userId);
            const showDate = (nextMessage.userId !== message.userId)

            const recent = now.diff(moment(message.createdAt)) < oneDay;

            const firstOfDay = uniqueDayIndex.includes(idx);
            const lastOfDay = uniqueDayEndIndex.includes(idx);

            return (
               <MessageItem
                  authUser={authUser}
                  key={message.mid}
                  message={message}
                  onRemoveMessage={onRemoveMessage}
                  showName={showName || first || firstOfDay}
                  first={first || firstOfDay}
                  showDate={showDate || (lastOfDay && !last)}
                  last={last}
                  recent={recent}
               />
            )
         })}
      </>
   )
};

export default React.memo(MessageList);
