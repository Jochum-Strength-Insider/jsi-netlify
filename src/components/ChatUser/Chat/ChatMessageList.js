import React from 'react';
import MessageItem from './ChatMessageItem';

import moment from 'moment';

// import ListGroup from 'react-bootstrap/ListGroup';
// import Container from 'react-bootstrap/Container';

const MessageList = ({ authUser, onRemoveMessage, messages }) => {
   const oneDay = 86400000;
   const now = moment();
   // const oneHour = 3600000;
   // const tenMinutes = oneHour / 6;
   // const thirtyMinutes = oneHour / 2;


   const daysArray = messages.map(message => moment(message.createdAt).startOf("D").format("MMM DD"));


   const days = [...new Set(daysArray)];

   const uniqueDayIndex = days.map(day => daysArray.findIndex(el => el === day))
   const uniqueDayEndIndex = days.map(day => daysArray.lastIndexOf(day))

   return (
      <>
         {messages.map((message, idx) => {

            // const momentObject = moment(message.createdAt);
            // const timeFromNow = momentObject.fromNow();
            // const startOfDay = momentObject.startOf("D");

            const first = (idx === 0);
            const last = (idx === (messages.length - 1));

            const nextIndex = messages[idx + 1] ? idx + 1 : idx;
            const prevIndex = messages[idx - 1] ? idx - 1 : idx;
            const nextMessage = messages[nextIndex];
            const prevMessage = messages[prevIndex];
            const showName = (prevMessage.userId !== message.userId);
            const showDate = (nextMessage.userId !== message.userId);

            // const timeBetween = moment(nextMessage.createdAt).diff(moment(message.createdAt));
            // const showTimeBetween = timeBetween > oneHour;


            const recent = now.diff(moment(message.createdAt)) < oneDay;
            // const recentTime = now.diff(moment(message.createdAt)) < oneDay;
            // const showRecent = recent && showDate;

            const firstOfDay = uniqueDayIndex.includes(idx);
            const lastOfDay = uniqueDayEndIndex.includes(idx);

            // diff() : startOfDay.diff(startOfNextDay) return milliseconds difference
            // isSame() : moment('2020-01-01').isAfter('2019-01-01')

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

// rules
// 1. show date at first message for a given day