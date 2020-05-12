import React, { useState, useEffect, memo } from "react";

// import "./style.css";

import { withFirebase } from '../Firebase';

// import * as ROUTES from '../../constants/routes';

// import { withRouter } from 'react-router-dom';
import WorkoutList from './WorkoutList';
import AdminDiet from '../AdminDiet';
import AdminWeight from '../AdminWeight';
import ChatRoom from '../ChatAdmin';

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const UserItem = memo(({ user }) => {
   const [tab, setTab] = useState('profile');

   return (
      <>
         {
            user ? (
               <UserTabs key={user.uid} tab={tab} setTab={setTab} user={user} />
            ) : null
         }
      </>
   );
})

const UserTabs = memo(({ tab, setTab, user, loading }) => {
   const { uid } = user;
   return (
      <div className="user-item">
         <MyTabs
            tab={tab}
            setTab={setTab}
            key={user.uid}
         >
            <div label="profile" title="Profile">
               <Profile key={uid} user={user} loading={loading} />
            </div>
            <div label="workouts" title="Programs">
               <WorkoutList key={uid} uid={uid} />
            </div>
            <div label="messages" title="Messages">
               <ChatRoom key={uid} user={user} />
            </div>
            <div label="diet" title="Diet">
               <AdminDiet key={uid} uid={uid} user={user} />
            </div>
            <div label="weight" title="Weight">
               <AdminWeight key={uid} uid={uid} user={user} />
            </div>
         </MyTabs>
      </div>
   )
})

const MyTabs = memo(({ children, tab, setTab }) => {

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

         <DropdownButton className="d-flex d-md-none my-tabs-dropdown mb-3" title={tab} key={`${tab}-dropdown-menu`} >
            {children.map(child => {
               const { title, label } = child.props;
               return (
                  <Dropdown.Item key={`${label}-dropdown`} onClick={() => setTab(label)}>{title}</Dropdown.Item>
               )
            }
            )}
         </DropdownButton>

         {/* <TabsSelect options={children} tab={tab} handleChange={handleChange} /> */}

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
})

// const TabsSelect = ({ tab, options, handleChange }) => {
//    console.log("tabSelect Render")
//    return (
//       <select className="d-flex d-md-none my-tabs-dropdown mb-3" key={`${tab}-dropdown-menu`} onChange={handleChange} value={tab} >
//          {options.map(child => {
//             const { title, label } = child.props;
//             return (
//                <option key={`${label}-dropdown-item`} value={label}>{title}</option>
//             )
//          }
//          )}
//       </select>
//    )
// }


const ProfileBase = ({ user, firebase }) => {
   const [error, setError] = useState(null);
   const [active, setActive] = useState(user.ACTIVE);
   const [alert, setAlert] = useState(false);

   useEffect(() => {
      firebase.active(user.uid)
         .on("value", snap => {
            setActive(snap.val());
         });
      return () => firebase.active(user.uid).off();
   }, [firebase, user.uid]);

   const onSendPasswordResetEmail = () => {
      firebase.doPasswordReset(user.email)
         .then(() => {
            onAlert();
         })
         .catch(error => setError(error));;
   };

   const onAlert = () => {
      setAlert(true)
      setTimeout(() => {
         setAlert(false);
      }, 2000);
   }

   const activateUser = () => {
      console.log("active", user.uid);
      firebase
         .activate(user.uid)
         .then(() => console.log("activated"))
   };

   const deactivateUser = () => {
      console.log("inactive");
      firebase
         .deactivate(user.uid)
         .then(() => console.log("deactivated"))
         .catch(error => setError(error));
   };

   const memberDate = user ? new Date(user.createdAt) : new Date();
   const memberDateString = memberDate.toLocaleDateString("en-US");
   const programDate = (user && user.programDate) ? new Date(user.programDate) : null;
   const programDateString = programDate ? programDate.toLocaleDateString("en-US") : "-";

   return (
      <ListGroup className="mb-5">
         <ListGroup.Item><strong>Username:</strong> {user.username}</ListGroup.Item>
         <ListGroup.Item className="no-top-border"><strong>E-Mail:</strong> {user.email}</ListGroup.Item>
         <ListGroup.Item><strong>Member Since:</strong> {memberDateString}</ListGroup.Item>
         <ListGroup.Item><strong>Last Program:</strong> {programDateString}</ListGroup.Item>
         <ListGroup.Item>
            <Button
               type="button"
               variant={alert ? "success" : "primary"}
               onClick={onSendPasswordResetEmail}
            >
               {alert ? "Password Reset Sent" : "Send Password Reset"}
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

// const UserItem = withRouter(withFirebase(UserItemBase));
export default UserItem;