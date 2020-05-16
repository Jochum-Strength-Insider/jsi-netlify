import React from "react";

import moment from 'moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MessageItem = ({ message, authUser, showDate, showName, recent, first, last }) => {
   const style = (authUser.uid === message.userId) ? 'messageSender' : 'messageReceiver';
   const end = (authUser.uid === message.userId) ? 'justify-content-end' : 'justify-content-start';
   const date = moment(message.createdAt);
   const dateString = date.format("MMM DD");
   const timeString = date.format("hh:mm a")
   const fromNow = date.fromNow();
   const today = moment().format("MMM DD");
   return (
      <>
         {first
            ? (
               <Row>
                  <Col className="d-flex justify-content-center">
                     <div className="messageDate mt-3">{dateString === today ? "today" : dateString}</div>
                  </Col>
               </Row>
            )
            : null
         }
         <Row>
            <Col className={"d-flex " + end}>
               <div className={"message " + style}>
                  {showName ? <div className="messageUsername">{message.username}</div> : null}
                  <div className="messageText">
                     {message.text}
                  </div>
               </div>
            </Col>
         </Row>

         {showDate
            ? (
               <Row>
                  <Col className={"d-flex " + end}>
                     <div className="messageDate">{timeString}</div>
                  </Col>
               </Row>
            )
            : null
         }

         {last
            ? (
               <Row>
                  <Col className="d-flex justify-content-center">
                     <div className="messageDate">{!recent ? dateString + " " + timeString : fromNow}</div>
                  </Col>
               </Row>
            )
            : null
         }
      </>
   )
}

export default React.memo(MessageItem);