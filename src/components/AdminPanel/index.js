import React, { Component, useState, useContext } from "react";
import { withRouter } from 'react-router-dom';

import moment from 'moment';
import "./style.css";

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import useResizeWindow from '../../hooks/useResizeWindow';
import { AuthUserContext } from '../Session';

// import dummyUsers from '../../constants/dummyUsers';

import ListGroup from 'react-bootstrap/ListGroup'
// import Alert from 'react-bootstrap/Alert'

import { SignUpForm } from '../SignUp';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from '../Modal';
import Loading from '../Loading';
import { UserItem } from '../Users';

const AdminPanel = ({ loading, usersList, unread }) => {
   const [currentUser, setCurrentUser] = useState(null);

   return (
      <>
         <Sidebar menu={<UserList2 setCurrentUser={setCurrentUser} usersList={usersList} current={currentUser} />}>
            <UserItem user={currentUser} loading={loading} />
         </Sidebar>
      </>
   )
};


class UserListBase extends Component {
   constructor(props) {
      super(props);

      const initialUsersList = this.props.usersList;

      this.state = {
         sortedUsers: initialUsersList,
         asc: true,
         filter: true,
         show: false,
         showMessage: false,
         groupMessage: {},
      };
   }

   sortUsersBy = (property) => () => {
      const { asc } = this.state;
      const fx = (a, b) => asc ? (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1) : (a[property].toLowerCase() < b[property].toLowerCase() ? 1 : -1);
      const sortedUsers = this.props.usersList.sort(fx);
      this.setState(state => ({ sortedUsers: sortedUsers, asc: !state.asc }))
   }

   sortUsersByProgramDate = () => {
      const { asc } = this.state;
      const fx = (a, b) => asc ? (a["programDate"] > b["programDate"] ? 1 : -1) : (a["programDate"] < b["programDate"] ? 1 : -1);
      const sortedUsers = this.props.usersList.sort(fx);
      this.setState(state => ({ sortedUsers: sortedUsers, asc: !state.asc }))
   }

   filterUsers = () => {
      const { filter } = this.state;
      const fx = (user => user.ACTIVE === filter);
      const filteredUsers = this.props.usersList.filter(fx);
      this.setState(state => ({ sortedUsers: filteredUsers, filter: !state.filter }))
   }

   showAll = () => {
      this.setState({ sortedUsers: this.props.usersList });
   }

   handleOpen = () => {
      this.setState({ show: true })
   }

   handleClose = () => {
      this.setState({ show: false })
   }

   handleOpenMessage = () => {
      this.setState({ showMessage: true })
   }

   handleCloseMessage = () => {
      this.setState({ showMessage: false, groupMessage: {} });
   }

   addToGroupMessage = (user) => (e) => {
      // e.preventDefault();
      const { groupMessage } = this.state;
      const groupMessageUpdate = { ...groupMessage };
      if (groupMessage[user.uid]) {
         delete groupMessageUpdate[user.uid];
         this.setState({ groupMessage: groupMessageUpdate }, () => console.log(this.state.groupMessage));
      } else {
         groupMessageUpdate[user.uid] = user.username;
         this.setState({ groupMessage: groupMessageUpdate }, () => console.log(this.state.groupMessage));
      }
   }

   // clearGroupMessage = () => {
   //    this.setState({groupMessage: {}}, () => console.log(this.state.groupMessage));
   // }



   userFromParams = () => {
      const found = this.props.usersList.findIndex(user => user.uid === this.props.match.params.id);
      if (found !== -1) {
         console.log("found");
         // console.log(this.props.usersList[found]);
         this.props.setCurrentUser(this.props.usersList[found]);
      } else {
         this.props.history.push(ROUTES.ADMIN);
         console.log("nope");
      }
   }

   handleSetCurrentUser = (user) => {
      // this.props.setCurrentUser(user);
      this.props.history.push(`${ROUTES.ADMIN}/${user.uid}`);
   }

   componentDidUpdate(prevProps) {
      if (this.props.usersList.length !== prevProps.usersList.length) {
         this.setState({ sortedUsers: this.props.usersList })
      }
      if (this.props.match.params.id !== prevProps.match.params.id) {
         console.log("new")
         this.userFromParams();
      }
   }

   componentDidMount() {
      if (this.props.match.params) {
         this.userFromParams();
      }
   }

   componentWillUnmount() {
      this.props.firebase.users().off();
   }

   render() {
      const { sortedUsers, loading, groupMessage } = this.state;
      const sendable = Object.keys(groupMessage).length > 0;
      return (
         <>
            <Modal handleClose={this.handleClose} show={this.state.show} heading={"Add User?"}>
               <SignUpForm handleClose={this.handleClose} />
            </Modal>

            <Modal handleClose={this.handleCloseMessage} show={this.state.showMessage} heading={"Send Group Message?"}>
               <>
                  <GroupMessageForm groupMessages={groupMessage} handleClose={this.handleCloseMessage} />
               </>
            </Modal>

            <Card className="mx-0 users-list">
               <ListGroup variant="flush" >
                  <ListGroup.Item>
                     <Form.Group className="py-0 my-0">
                        <DropdownButton className="dropdown-block" id="dropdown-basic-button" title="Filter">
                           <Dropdown.Item onClick={this.sortUsersBy("username")}>Username</Dropdown.Item>
                           <Dropdown.Item onClick={this.sortUsersBy("email")}>Email</Dropdown.Item>
                           <Dropdown.Item onClick={this.sortUsersByProgramDate}>Program Date</Dropdown.Item>
                           <Dropdown.Item onClick={this.filterUsers}>Inactive</Dropdown.Item>
                           <Dropdown.Item onClick={this.showAll}>All</Dropdown.Item>
                           {sendable && <Dropdown.Item onClick={this.handleOpenMessage}>Group Message</Dropdown.Item>}
                        </DropdownButton>
                     </Form.Group>
                  </ListGroup.Item>

                  <div className="users-list-contain">
                     {loading && <ListGroup.Item><Loading /></ListGroup.Item>}
                     {sortedUsers.map(user => {
                        // {dummyUsers.map(user => {
                        const date = user.programDate ? new Date(user.programDate).toLocaleDateString("en-US") : "-";
                        // const checked = this.state.groupMessage[user.uid] ? true : false;
                        const current = this.props.current ? this.props.current.uid : null;
                        const currentUser = current === user.uid ? "no-border current" : "no-border";

                        return (
                           <ListGroup.Item className={currentUser} key={user.uid}>
                              <div
                                 className="btn btn-link mx-0 px-0"
                                 onClick={() => this.handleSetCurrentUser(user)}
                              >
                                 {user.username}{user.adminUnread && <span style={{ color: "red" }}>•</span>}<span className="sr-only">unread messages</span>
                              </div>

                              {/* <Link
                                 className="btn btn-link px-0 py-0"
                                 onClick={() => this.handleSetCurrentUser(user)}
                                 to={{
                                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                 }}
                              >
                                 {user.username}
                              </Link> */}

                              <div>{date}</div>
                              {/* <hr></hr>
                              <label>
                                 Message:
                                 <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={checked}
                                    onChange={this.addToGroupMessage(user)}
                                 />
                              </label> */}
                           </ListGroup.Item>
                        )
                     })}
                  </div>
                  <ListGroup.Item>
                     <button className="add-user-button" onClick={this.handleOpen}>Add User</button>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </>
      );
   }
}

const UserList2 = withFirebase(withRouter(UserListBase));

const Sidebar = ({ children, menu }) => {
   const isMobile = useResizeWindow(626);
   const [drawerOpen, setDrawerOpen] = useState(!isMobile);

   const handleDrawer = () => {
      setDrawerOpen(!drawerOpen)
   };

   return (
      <>
         <div className="d-block d-md-none">
            <div className="d-flex drawer">
               <div className="drawer-nav d-flex justify-content-center align-items-center" onClick={handleDrawer}>
                  <button className="hamburger">
                     <div className="patty"></div>
                     <div className="patty"></div>
                     <div className="patty"></div>
                  </button>
               </div>
               <main className="drawer-main">
                  {children}
               </main>
            </div>

            <div className={`overlay d-flex ${drawerOpen ? "open" : ""}`}>
               <aside className="overlay-content">
                  {menu}
               </aside>
               {/* <div className="overlay-close d-flex justify-content-center"><button onClick={handleDrawer}>x</button></div> */}
               <div className="drawer-nav d-flex justify-content-center align-items-center" onClick={handleDrawer}>
                  <button className="hamburger">
                     <div className="patty"></div>
                     <div className="patty"></div>
                     <div className="patty"></div>
                  </button>
               </div>
            </div>
         </div>

         <div className="d-none d-md-flex drawer">
            <div className="d-flex">
               <aside className={`dashboard-menu ${drawerOpen ? " open" : ""}`}>
                  {menu}
               </aside>
               <div className="drawer-nav d-flex justify-content-center align-items-center" onClick={handleDrawer}>
                  <button className="hamburger">
                     <div className="patty"></div>
                     <div className="patty"></div>
                     <div className="patty"></div>
                  </button>
               </div>
            </div>
            <main className="drawer-main">
               <div className="d-flex justify-content-center">
                  <div className=" contain-width">
                     {children}
                  </div>
               </div>
            </main>
         </div>
      </>
   );
}

const GroupMessageFormBase = ({ groupMessages, handleClose, firebase }) => {
   const [message, setMessage] = useState("");
   const authUser = useContext(AuthUserContext)
   const groupMessageList = Object.keys(groupMessages).map(key => key);

   const sendable = groupMessageList.length > 0;

   const onSendGroupMessage = (e) => {
      e.preventDefault();

      const text = message.trim();
      if (text !== "" && sendable) {

         const messageObject = {
            text,
            userId: authUser.uid,
            username: authUser.username,
            createdAt: Number(moment().format("x")),
         }
         // console.log(groupMessageList, messageObject)

         groupMessageList.forEach(key => {
            firebase.messages(key).push(messageObject);
            firebase.user(key).update({ unread: true });
         })
         handleClose();
      }
   }

   const onChange = (e) => {
      const { value } = e.target;
      setMessage(value);
   }

   return (
      <>
         {
            sendable && (
               <select id="cars">
                  {groupMessageList.map(key => {
                     return <option key={key}>{groupMessages[key]}</option>
                  })}
               </select>
            )
         }

         <Form onSubmit={onSendGroupMessage}>
            <Form.Group>
               <Form.Label>Send Group Message</Form.Label>
               <Form.Control
                  type="text"
                  name="group-message"
                  value={message}
                  onChange={onChange}
                  as="textarea"
                  rows="3"
               />
            </Form.Group>
            <Button variant="primary" disabled={!sendable} type="submit">Send</Button>
         </Form >
      </>
   )
}

const GroupMessageForm = withFirebase(GroupMessageFormBase);

export default AdminPanel;