import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';

import { onValue, child, update, orderByChild, query, limitToLast, push } from "firebase/database";

import moment from 'moment';

import "./style.css";

import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../Firebase';

import MessageList from './ChatMessageList';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const AdminChatBase = ({firebase, roomId, authUser}) => {
    const initialLimit = 15;
    const scrollBottom = useRef(null);
    const [scroll, setScroll] = useState(true);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [limit, setLimit] = useState(initialLimit);
    const [firstDate, setFirstDate] = useState(true);

    const scrollToBottom = useCallback(() => {
      if(scrollBottom.current){
        scrollBottom.current.scrollIntoView();
      }
    }, [scrollBottom]);

    useEffect(() => {
      setLoading(true);
      const messageQueryRef = query(firebase.messages(roomId), orderByChild('createdAt'), limitToLast(limit));
    
      onValue(messageQueryRef, snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            mid: key,
          }));

          const userRef = firebase.user(roomId);
          update(userRef, { unread: null });

          setMessages(messageList);
          setLoading(false);
          if(scroll){
            scrollToBottom();
          }
        } else {
            setMessages([]);
            setLoading(false);
        }
      })

    // return () => messageQueryRef.off();
  }, [roomId, firebase, limit, scroll, scrollToBottom]);


  const onCreateMessage = (authUser, message) => {
    const text = message.trim();
    if (text !== "") {

      const messageObject = {
        text,
        userId: authUser.uid,
        username: authUser.username,
        createdAt: Number(moment().format("x")),
      };

      const messagesRef = firebase.messages(roomId);

      push(messagesRef, messageObject)
        .then((snap) => {
            const key = snap.key;
            const adminUnreadMessagesRef = firebase.adminUnreadMessages()
            update(adminUnreadMessagesRef, {[key]: messageObject})
            setLimit(limit + 1);
        })
        .catch(error => {
          if (error) {
            console.log(error);
          }
        });

      setScroll(true);
    }
  }

  const onRemoveMessage = mid => {
    child(firebase.message(roomId), mid).remove();
  };

  const loadMore = () => {
    if (!firstDate) {
      firebase.messages(roomId)
        .orderByChild('createdAt')
        .limitToFirst(1)
        .once("value").then(snapshot => {
          const messageObject = snapshot.val();
          if (messageObject) {
            const message = Object.keys(messageObject).map(key => ({
              ...messageObject[key],
              mid: key,
            }))[0];

            setLimit(limit + initialLimit);
            setFirstDate(message.createdAt);
            setScroll(false);
          }
        })
    } else {
        setLimit(limit + initialLimit);
        setScroll(false);
    }
  }

  const messageDates = messages.map(message => message.createdAt);
  const firstDateNotIncluded = messageDates.indexOf(firstDate) === -1 ? true : false;
  const enoughMessages = messages.length === limit ? true : false;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="messages">
            <Container className="messageContainer" fluid>

              {loading && <div>Loading ...</div>}

              {firstDateNotIncluded && enoughMessages && <Button variant="outline-primary" className="mt-3 messageLoadMore" block onClick={loadMore}>Load More</Button>}

              {(messages.length > 0) ? (
                <MessageList
                  authUser={authUser}
                  messages={messages}
                  onRemoveMessage={onRemoveMessage}
                />
              ) : (
                  <div>There are no messages ...</div>
                )}
              <div className="mb-3" ref={scrollBottom}></div>
            </Container>

            <SubmitForm onCreateMessage={onCreateMessage} />
          </div>
        )}
      </AuthUserContext.Consumer>
    )
}

const SubmitForm = ({ onCreateMessage }) => {
  const [message, setMessage] = useState('');
  const authUser = useContext(AuthUserContext);

  const autoSize = (e) => {
    const { target } = e;
    target.style.cssText = 'height:auto; padding:6px';
    target.style.cssText = 'height:' + target.scrollHeight + 'px';
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (message !== "") {
        handleCreateMessage(e)
      }
    }
  }

  const onChange = (e) => {
    autoSize(e);
    setMessage(e.target.value);
  }

  const handleCreateMessage = (e) => {
    e.preventDefault();
    onCreateMessage(authUser, message);
    setMessage("");
  }

  return (
    <Form className="chat-form" onSubmit={handleCreateMessage}>
      <div className="chat-form-corner"></div>
      <textarea
        rows="1"
        style={{ height: "36px" }}
        placeholder="Reply..."
        className="chat-form-input"
        type="text"
        onChange={onChange}
        onKeyDown={onEnterPress}
        value={message}
      />
      <Button className="chat-form-submit" type="submit">Send</Button>
    </Form>
  )
}

const AdminChat = withFirebase(AdminChatBase);

export default AdminChat;