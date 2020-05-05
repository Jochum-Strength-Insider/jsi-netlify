import React, { PureComponent, useState, useEffect } from "react";

// import moment from 'moment';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

import { withRouter } from 'react-router-dom';
import WorkoutList from '../WorkoutList';
import AdminDiet from '../AdminDiet';
import AdminWeight from '../AdminWeight';
import { ChatRoom } from '../ChatAdmin';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


class UserItemBase extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         tab: "profile",
         user: null,
      };
   }

   fetchUser = () => {
      if (this.props.location.state && this.props.location.state.user) {
         console.log("user from location state");
         this.setState({ user: this.props.location.state.user });
         return;
      }

      this.setState({ loading: true });
      this.props.firebase
         .user(this.props.match.params.id)
         .on('value', snapshot => {
            console.log("user from firebase call");
            const user = snapshot.val();
            const key = snapshot.key;
            const userObject = {
               ...user, uid: key,
            }
            if (user) {
               this.setState({
                  user: userObject,
                  loading: false,
               });
            } else {
               this.props.history.push(ROUTES.ADMIN);
            }
         });
   }

   onSendPasswordResetEmail = () => {
      this.props.firebase.doPasswordReset(this.state.user.email);
   };

   setTab = (k) => {
      this.setState({ tab: k });
   }

   componentDidMount() {
      this.fetchUser();
   }

   componentDidUpdate(prevProps) {
      if (this.props.match.params.id !== prevProps.match.params.id) {
         this.props.firebase.user(prevProps.match.params.id).off();
         this.fetchUser();
      }
   }

   componentWillUnmount() {
      this.props.firebase.user(this.props.match.params.id).off();
   }

   render() {
      const { user, loading, tab } = this.state;
      // const { isMobile } = this.props;
      // const path = isMobile ? ROUTES.ADMIN_MOBILE : ROUTES.ADMIN;

      return (
         <div>
            {loading && <div>Loading ...</div>}
            {user && (
               <>
                  <UserTabs key={user.uid} tab={tab} setTab={this.setTab} user={user} loading={loading} onSendPasswordResetEmail={this.onSendPasswordResetEmail} />
               </>
            )}
         </div>
      );
   }
}

const UserTabs = ({ tab, setTab, user, loading, onSendPasswordResetEmail }) => {
   return (
      <Tabs
         fill
         defaultActiveKey="profile"
         className="dark-tab user-info"
         activeKey={tab}
         onSelect={setTab}
      >
         <Tab eventKey="profile" title="Profile">
            <Profile user={user} loading={loading} onSendPasswordResetEmail={onSendPasswordResetEmail} />
         </Tab>
         <Tab eventKey="workouts" title="Programs">
            <WorkoutList uid={user.uid} />
         </Tab>
         <Tab eventKey="messages" title="Messages">
            <ChatRoom user={user} />
         </Tab>
         <Tab eventKey="diet" title="Diet">
            <AdminDiet uid={user.uid} user={user} />
         </Tab>
         <Tab eventKey="weight" title="Weight">
            <AdminWeight uid={user.uid} user={user} />
         </Tab>
      </Tabs>
   )
}

const ProfileBase = ({ user, onSendPasswordResetEmail, firebase }) => {
   const [error, setError] = useState(null);
   const [active, setActive] = useState(user.ACTIVE);

   useEffect(() => {
      firebase.active(user.uid)
         .on("value", snap => {
            setActive(snap.val());
         });
      return () => firebase.active(user.uid).off();
   }, [firebase, user.uid]);


   const memberDate = user ? new Date(user.createdAt) : new Date();
   const memberDateString = memberDate.toLocaleDateString("en-US");
   const programDate = (user && user.programDate) ? new Date(user.programDate) : null;
   const programDateString = programDate ? programDate.toLocaleDateString("en-US") : "-";

   const activateUser = () => {
      console.log("active", user.uid);
      firebase
         .activate(user.uid)
         .then(() => console.log("activated"))
         .catch(error => setError(error));
   };
   const deactivateUser = () => {
      console.log("inactive");
      firebase
         .deactivate(user.uid)
         .then(() => console.log("deactivated"))
         .catch(error => setError(error));
   };

   return (
      <ListGroup className="mb-5">
         <ListGroup.Item><strong>Username:</strong> {user.username}</ListGroup.Item>
         <ListGroup.Item className="no-top-border"><strong>E-Mail:</strong> {user.email}</ListGroup.Item>
         <ListGroup.Item><strong>Member Since:</strong> {memberDateString}</ListGroup.Item>
         <ListGroup.Item><strong>Last Program:</strong> {programDateString}</ListGroup.Item>
         <ListGroup.Item>
            <Button
               type="button"
               onClick={onSendPasswordResetEmail}
            >
               Send Password Reset
            </Button>
         </ListGroup.Item>
         <ListGroup.Item>
            {active ? (
               <Button
                  type="button"
                  onClick={deactivateUser}
                  variant="danger"
               >
                  Deactivate
               </Button>
            ) : (
                  <Button
                     type="button"
                     onClick={activateUser}
                     variant="success"
                  >
                     Activate
                  </Button>
               )
            }
         </ListGroup.Item>
         {
            error && (
               <ListGroup.Item><Alert variant="warning">{error}</Alert></ListGroup.Item>
            )
         }
      </ListGroup>
   )
}

const Profile = withFirebase(ProfileBase);

const UserItem = withRouter(withFirebase(UserItemBase));

export default UserItem;