import React from "react";

// import moment from 'moment';

// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MessageItem = ({ message, authUser, showDate, showName }) => {
   // constructor(props) {
   //    super(props);
   //    this.state = {
   //       editMode: false,
   //       editText: this.props.message.text,
   //    };
   // }

   // onToggleEditMode = () => {
   //    this.setState(state => ({
   //       editMode: !state.editMode,
   //       editText: this.props.message.text,
   //    }));
   // };

   // const onChangeEditText = event => {
   //    this.setState({ editText: event.target.value });
   // };

   // const onSaveEditText = () => {
   //    this.props.onEditMessage(this.props.message, this.state.editText);
   //    this.setState({ editMode: false });
   // };

   const style = (authUser.uid === message.userId) ? 'messageSender' : 'messageReceiver';
   const end = (authUser.uid === message.userId) ? 'justify-content-end' : 'justify-content-start';
   const date = new Date(message.createdAt);
   const dateString = date.toLocaleDateString("en-US");
   const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


   return (

      <>
         <Row>
            <Col className={"d-flex " + end}>

               <div className={"message " + style}>
                  {showName ? <div className="messageUsername">{message.username}</div> : null}
                  <div className="messageText">
                     {message.text}
                     {/* <strong>{message.username}</strong> {message.text} */}
                     {/* {message.editedAt && <span>(Edited)</span>} */}
                  </div>
               </div>

               {/* {((authUser.uid === message.userId) || (authUser.ADMIN)) &&
               <Button
                  type="Button"
                  onClick={() => onRemoveMessage(message.uid)}
               >
                  Delete
                     </Button>
            } */}
            </Col>
         </Row>
         {showDate
            ? (
               <Row>
                  <Col className="d-flex justify-content-center">
                     <div className="messageDate">{dateString + " " + timeString}</div>
                  </Col>
               </Row>
            )
            : null
         }
      </>
   )
}

export default React.memo(MessageItem);