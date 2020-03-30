import React, { Component } from "react";

// import Button from 'react-bootstrap/Button';
// import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MessageItem extends Component {
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

   onChangeEditText = event => {
      this.setState({ editText: event.target.value });
   };

   onSaveEditText = () => {
      this.props.onEditMessage(this.props.message, this.state.editText);
      this.setState({ editMode: false });
   };

   render() {
      const { message, authUser } = this.props;
      // const { editMode, editText } = this.state;

      // (authUser.uid === message.userId)

      const style = (authUser.uid === message.userId) ? 'messageSender' : 'messageReceiver';
      const end = (authUser.uid === message.userId) ? 'justify-content-end' : 'justify-content-start';

      return (
         <Row>
            <Col className={"d-flex " + end}>
               <div className={"message " + style}>
                  {message.text}
                  {/* <strong>{message.username}</strong> {message.text} */}
                  {/* {message.editedAt && <span>(Edited)</span>} */}
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
      )
   }
}

export default MessageItem;