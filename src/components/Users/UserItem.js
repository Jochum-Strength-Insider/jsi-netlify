import React, { PureComponent, useState, useEffect } from "react";

// import "./style.css";

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

import { withRouter } from 'react-router-dom';
import WorkoutList from './WorkoutList';
import AdminDiet from '../AdminDiet';
import AdminWeight from '../AdminWeight';
import { ChatRoom } from '../ChatAdmin';


import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class UserItemBase extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         tab: "profile",
         user: null,
      };
   }

   // fetchUser = () => {
   //    if (!this.props.user) {
   //       this.props.history.push(ROUTES.ADMIN);
   //    }
   // }

   onSendPasswordResetEmail = () => {
      this.props.firebase.doPasswordReset(this.props.user.email);
   };

   setTab = (k) => {
      this.setState({ tab: k });
   }

   // componentDidMount() {
   //    this.fetchUser();
   // }

   render() {
      const { loading, tab } = this.state;
      const { user } = this.props;

      return (
         <div>
            {user && (
               <>
                  <UserTabs key={user.uid} tab={tab} setTab={this.setTab} user={user} loading={loading} onSendPasswordResetEmail={this.onSendPasswordResetEmail} />
               </>
            )}
            {loading && <div>Loading ...</div>}
         </div>
      );
   }
}

const UserTabs = ({ tab, setTab, user, loading, onSendPasswordResetEmail }) => {
   return (
      <div className="user-item">
         {/* <Tabs
            fill
            defaultActiveKey="profile"
            className="dark-tab"
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
         </Tabs> */}

         {/* <h5 className="mb-2">{user.username}</h5> */}
         <MyTabs
            tab={tab}
            setTab={setTab}
         >
            <div label="profile" title="Profile">
               <Profile key={user.uid} user={user} loading={loading} onSendPasswordResetEmail={onSendPasswordResetEmail} />
            </div>
            <div label="workouts" title="Programs">
               <WorkoutList key={user.uid} uid={user.uid} />
            </div>
            <div label="messages" title="Messages">
               <ChatRoom key={user.uid} user={user} />
            </div>
            <div label="diet" title="Diet">
               <AdminDiet key={user.uid} uid={user.uid} user={user} />
            </div>
            <div label="weight" title="Weight">
               <AdminWeight key={user.uid} uid={user.uid} user={user} />
            </div>
         </MyTabs>
      </div>
   )
}

const MyTabs = ({ children, tab, setTab }) => {

   return (
      <div className="my-tabs pt-3">
         <nav className="d-none d-md-flex my-tabs-nav mb-3" role="tablist">
            {children.map(child => {
               const { title, label } = child.props;
               if (child.props.label === tab) {
                  return (
                     <button
                        role="tab"
                        aria-selected="true"
                        key={label}
                        onClick={() => setTab(label)}
                        className="my-tabs-link active">
                        {title}
                     </button>
                  )
               } else {
                  return (
                     <button
                        role="tab"
                        aria-selected="false"
                        key={label}
                        onClick={() => setTab(label)}
                        className="my-tabs-link">
                        {title}
                     </button>
                  )
               }
            })}
         </nav>

         <DropdownButton className="d-flex d-md-none my-tabs-dropdown mb-3" title={tab}>
            {children.map(child => {
               const { title, label } = child.props;
               return (
                  <Dropdown.Item key={label} onClick={() => setTab(label)}>{title}</Dropdown.Item>
               )
            }
            )}
         </DropdownButton>

         <div className="my-tabs-content">
            {children.map(child => {
               if (child.props.label === tab) {
                  return (child.props.children);
               } else {
                  return null;
               }
            })
            }
         </div>
      </div>
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