import React, { Component, useState } from "react";

// import moment from 'moment';
import "./style.css";

import { withFirebase } from '../Firebase';

import ListGroup from 'react-bootstrap/ListGroup'
// import Alert from 'react-bootstrap/Alert'

import { SignUpForm } from '../SignUp';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from '../Modal';
import Loading from '../Loading';
import { UserItem } from '../Users';

// eslint-disable-next-line
const dummyUsers = [
   {
      ACTIVE: true,
      uid: "fagah",
      programDate: "",
      username: "test1",
      adminUnread: false,
      email: "test1@email.com",
   },
   {
      ACTIVE: true,
      uid: "ggpgpg",
      programDate: "",
      username: "test2",
      adminUnread: false,
      email: "test2@email.com",
   },
   {
      ACTIVE: true,
      uid: "gglglg",
      programDate: "",
      username: "test3",
      adminUnread: false,
      email: "test3@email.com",
   },
   {
      ACTIVE: false,
      uid: "gpwirn",
      programDate: "",
      username: "test4",
      adminUnread: false,
      email: "test4@email.com",
   },
   {
      ACTIVE: false,
      uid: "vivp",
      programDate: "",
      username: "test5",
      adminUnread: false,
      email: "test5@email.com",
   },
   {
      ACTIVE: false,
      uid: "pov",
      programDate: "",
      username: "test6",
      adminUnread: false,
      email: "test6@email.com",
   },
   {
      ACTIVE: false,
      uid: "ag;a;g",
      programDate: "",
      username: "test7",
      adminUnread: true,
      email: "test7@email.com",
   },
   {
      ACTIVE: true,
      uid: "daffffff",
      programDate: "",
      username: "test8",
      adminUnread: false,
      email: "test8@email.com",
   },
   {
      ACTIVE: true,
      uid: "dffashh",
      programDate: "",
      username: "test9",
      adminUnread: false,
      email: "test9@email.com",
   },
   {
      ACTIVE: false,
      uid: "ag;llllll;g",
      programDate: "",
      username: "test10",
      adminUnread: false,
      email: "test10@email.com",
   },
   {
      ACTIVE: true,
      uid: "vivllllp",
      programDate: "",
      username: "test11",
      adminUnread: false,
      email: "test11@email.com",
   },
   {
      ACTIVE: false,
      uid: "aeyhmm",
      programDate: "",
      username: "test12",
      adminUnread: false,
      email: "test12@email.com",
   },
   {
      ACTIVE: true,
      uid: "ag;ggggggggg;g",
      programDate: "",
      username: "test13",
      adminUnread: false,
      email: "test13@email.com",
   },
   {
      ACTIVE: false,
      uid: "vivppppppppp",
      programDate: "",
      username: "test14",
      adminUnread: false,
      email: "test14@email.com",
   },
   {
      ACTIVE: true,
      uid: "povlllklnlknlkn",
      programDate: "",
      username: "test15",
      adminUnread: false,
      email: "test15@email.com",
   },
   {
      ACTIVE: true,
      uid: "ag;a;g16",
      programDate: "",
      username: "test16",
      adminUnread: false,
      email: "test16@email.com",
   },

]

const AdminPanel = ({ isMobile }) => {
   const [currentUser, setCurrentUser] = useState(null);

   return (
      <>
         {/* <Row>
            <Col className="mx-0 px-0" xs={3}>
               <UserList2 setCurrentUser={setCurrentUser} />
            </Col>
            <Col xs={9} className="user-item-contain">
               <UserItem user={currentUser} />
            </Col>
         </Row> */}

         <Sidebar isMobile={isMobile} menu={<UserList2 setCurrentUser={setCurrentUser} />}>
            <UserItem user={currentUser} />
         </Sidebar>
      </>
   )
};


class UserListBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         users: JSON.parse(localStorage.getItem('users')) || [],
         sortedUsers: JSON.parse(localStorage.getItem('users')) || [],
         asc: true,
         filter: true,
         show: false,
      };
   }

   sortUsersBy = (property) => () => {
      const { users, asc } = this.state;
      const fx = (a, b) => asc ? (a[property] > b[property] ? 1 : -1) : (a[property] < b[property] ? 1 : -1);
      const sortedUsers = users.sort(fx);
      this.setState(state => ({ sortedUsers: sortedUsers, asc: !state.asc }))
   }

   filterUsers = () => {
      const { users, filter } = this.state;
      const fx = (user => user.ACTIVE === filter);
      const filteredUsers = users.filter(fx);
      this.setState(state => ({ sortedUsers: filteredUsers, filter: !state.filter }))
   }

   showAll = () => {
      const { users } = this.state;
      this.setState({ sortedUsers: users });
   }


   handleOpen = () => {
      this.setState({ show: true })
   }

   handleClose = () => {
      this.setState({ show: false })
   }

   componentDidMount() {
      this.setState({ loading: true });

      this.props.firebase.users().on('value', snapshot => {
         const usersObject = snapshot.val();

         if (usersObject) {
            const usersList = Object.keys(usersObject).map(key => ({
               ...usersObject[key],
               uid: key,
            }));

            localStorage.setItem('users', JSON.stringify(usersList));
            this.setState({ users: usersList, sortedUsers: usersList, loading: false, })

            // this.props.setCurrentUser(usersList[usersList.length - 1])
         } else {
            localStorage.removeItem('users');
            this.setState({ loading: false })
         }
      });
   }

   componentWillUnmount() {
      this.props.firebase.users().off();
   }

   render() {
      const { sortedUsers, loading } = this.state;

      return (
         <>
            <Modal handleClose={this.handleClose} show={this.state.show} heading={"Add User?"}>
               <SignUpForm handleClose={this.handleClose} />
            </Modal>

            {/* <div className="d-flex justify-content-center"> */}
            {/* <div className="contain-width"> */}
            {/* <h1>Users List</h1> */}

            <Card className="mx-0 users-list">
               <ListGroup variant="flush" >
                  <ListGroup.Item>
                     <Form.Group className="py-0 my-0">
                        <DropdownButton className="dropdown-block" id="dropdown-basic-button" title="Filter">
                           <Dropdown.Item onClick={this.sortUsersBy("username")}>Username</Dropdown.Item>
                           <Dropdown.Item onClick={this.sortUsersBy("email")}>Email</Dropdown.Item>
                           <Dropdown.Item onClick={this.sortUsersBy("programDate")}>Program Date</Dropdown.Item>
                           <Dropdown.Item onClick={this.filterUsers}>Inactive</Dropdown.Item>
                           <Dropdown.Item onClick={this.showAll}>All</Dropdown.Item>
                        </DropdownButton>
                     </Form.Group>
                  </ListGroup.Item>

                  <div className="users-list-contain">
                     {loading && <ListGroup.Item><Loading /></ListGroup.Item>}
                     {sortedUsers.map(user => {
                        // {dummyUsers.map(user => {
                        const date = user.programDate ? new Date(user.programDate).toLocaleDateString("en-US") : "-";
                        return (
                           <ListGroup.Item className="no-border" key={user.uid} onClick={() => this.props.setCurrentUser(user)}>
                              <div>{user.username}{user.adminUnread && <span style={{ color: "red" }}>•</span>}</div>
                              <div>{date}</div>
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

const UserList2 = withFirebase(UserListBase);

const Sidebar = ({ children, menu, isMobile }) => {
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

export default AdminPanel;