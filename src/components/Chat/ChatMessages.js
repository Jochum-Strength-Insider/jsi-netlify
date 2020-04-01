import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

import MessageList from './ChatMessageList';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// set limit? limit for initial load then show all?

class AdminChatBase extends Component {
   constructor(props) {
      super(props);
      this.scrollContain = React.createRef();
      this.inputRef = React.createRef();
      this.state = {
         loading: false,
         messages: [],
         limit: 50,
      }
   }

   scrollToBottom = () => {
      this.scrollContain.current.scrollTop = this.scrollContain.current.scrollHeight;
   }

   componentDidMount() {
      this.onListenForMessages();
   }

   onListenForMessages() {
      this.setState({ loading: true });

      this.props.firebase
         .messages(this.props.roomId)
         .orderByChild('createdAt')
         .limitToLast(this.state.limit)
         .on("value", snapshot => {
            const messageObject = snapshot.val();

            if (messageObject) {
               const messageList = Object.keys(messageObject).map(key => ({
                  ...messageObject[key],
                  uid: key,
               }));

               this.props.firebase.user(this.props.roomId).update({ [this.props.setUnread]: false });
               this.setState({ messages: messageList, loading: false });
               this.scrollToBottom();

            } else {
               this.setState({ messages: [], loading: false })
            }

            this.setState({ loading: false });
         })
   }

   componentWillUnmount() {
      this.props.firebase.messages(this.props.roomId).off();
   }

   onChangeText = event => {
      this.setState({ text: event.target.value });
   }

   onCreateMessage = (authUser) => (e) => {
      const text = this.inputRef.current.value.trim();
      if (text !== "") {
         this.props.firebase.messages(this.props.roomId).push({
            // text: this.state.text,
            text,
            userId: authUser.uid,
            username: authUser.username,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
         });

         this.props.firebase.user(this.props.roomId).update({ [this.props.setPartnerUnread]: true });
         this.setState(state => ({ text: "", unreadCount: state.unreadCount + 1 }));

         this.inputRef.current.value = "";
      }
      e.preventDefault();
   }

   onRemoveMessage = mid => {
      this.props.firebase.message(this.props.roomId, mid).remove();
   };

   // onEditMessage = (message, text) => {
   //    const { uid, ...messageSnapshot } = message;
   //    this.props.firebase.message(message.uid).set({
   //       ...messageSnapshot,
   //       text,
   //       editedAt: this.props.firebase.serverValue.TIMESTAMP,
   //    });
   // };

   // onNextPage = () => {
   //    this.setState(
   //       state => ({ limit: state.limit + 5 }),
   //       this.onListenForMessages,
   //    );
   // };

   render() {
      const { messages, loading } = this.state;

      return (
         <AuthUserContext.Consumer>
            {authUser => (
               <>
                  <Container ref={this.scrollContain} className="messageContainer" fluid>
                     {/* {!loading && messages && (
                     <Button onClick={this.onNextPage}>
                        More
                     </Button>
                  )} */}

                     {loading && <div>Loading ...</div>}

                     {(messages.length > 0) ? (
                        <MessageList
                           authUser={authUser}
                           messages={messages}
                           onRemoveMessage={this.onRemoveMessage}
                        // onEditMessage={this.onEditMessage}
                        />
                     ) : (
                           <div>There are no messages ...</div>
                        )}
                     {/* <div ref={this.messagesEndRef} /> */}
                  </Container>
                  <hr />
                  {/* <Row>
                     <Col> */}
                  <Form className="mt-1" onSubmit={this.onCreateMessage(authUser)}>
                     <InputGroup className="mb-3">
                        <Form.Control
                           type="text"
                           ref={this.inputRef}
                        />
                        <InputGroup.Append>
                           <Button type="submit">Send</Button>
                        </InputGroup.Append>
                     </InputGroup>
                  </Form>
                  {/* </Col>
                  </Row> */}
               </>
            )}
         </AuthUserContext.Consumer>
      )
   }
}

const AdminChat = withFirebase(AdminChatBase);

export default AdminChat;