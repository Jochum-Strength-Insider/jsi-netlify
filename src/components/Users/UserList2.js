import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import moment from 'moment';

import "./style.css";

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import { SignUpForm } from '../SignUp';

import ListGroup from 'react-bootstrap/ListGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// import Modal from 'react-bootstrap/Modal';
import Modal from '../Modal';
import Loading from '../Loading';


// import Badge from 'react-bootstrap/Badge';

class UserListBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         users: JSON.parse(localStorage.getItem('users')) || [],
         asc: true,
         show: false,
      };
   }

   sortUsersBy = (property) => () => {
      const { users, asc } = this.state;
      const fx = (a, b) => asc ? (a[property] > b[property] ? 1 : -1) : (a[property] < b[property] ? 1 : -1);
      const sortedUsers = users.sort(fx);
      this.setState(state => ({ users: sortedUsers, asc: !state.asc }))
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
            this.setState({ users: usersList, loading: false, })
         } else {
            localStorage.removeItem('users');
            this.setState({ loading: false })
         }
      });
   }

   componentWillUnmount() {
      // console.log('unmount');
      this.props.firebase.users().off();
   }

   render() {
      const { users, loading } = this.state;
      const path = this.props.isMobile ? ROUTES.ADMIN_MOBILE : ROUTES.ADMIN;

      return (
         <>

            <Modal handleClose={this.handleClose} show={this.state.show} heading={"Add User?"}>
               <SignUpForm handleClose={this.handleClose} />
            </Modal>

            <div className="d-flex justify-content-center">
               <div className="contain-width">
                  {/* <h1>Users List</h1> */}

                  <Card className="mb-5">
                     <ListGroup variant="flush" >
                        <ListGroup.Item>
                           <Form.Group className="py-0 my-0">
                              {/*  <Form.Control
                                 style={{ borderRadius: "500px" }}
                                 type="text"
                                 name="userSearch"
                                 placeholder="search"
                              /> */}
                              <DropdownButton className="dropdown-block" id="dropdown-basic-button" title="Filter">
                                 <Dropdown.Item onClick={this.sortUsersBy("username")}>Username</Dropdown.Item>
                                 <Dropdown.Item onClick={this.sortUsersBy("email")}>Email</Dropdown.Item>
                                 <Dropdown.Item onClick={this.sortUsersBy("programDate")}>Program Date</Dropdown.Item>
                              </DropdownButton>
                           </Form.Group>
                        </ListGroup.Item>

                        {/* <ListGroup.Item className="md-hide">
                           <Row className="text-center">
                              <Col xs="12" sm="12" md="4" onClick={this.sortUsersBy("username")}><strong>Username:</strong></Col>
                              <Col xs="12" sm="12" md="4" onClick={this.sortUsersBy("email")}><strong>E-Mail:</strong></Col>
                              <Col xs="12" sm="12" md="4" onClick={this.sortUsersBy("programDate")}><strong>Last Program:</strong></Col>
                           </Row>
                        </ListGroup.Item> */}
                        <ListGroup.Item>
                           <Button block onClick={this.handleOpen}>Add User</Button>
                        </ListGroup.Item>

                        <div className="scrollListContain">
                           {loading && <ListGroup.Item><Loading /></ListGroup.Item>}
                           {users.map(user => {
                              const date = user.programDate ? new Date(user.programDate).toLocaleDateString("en-US") : "-";
                              return (
                                 <ListGroup.Item key={user.uid} >
                                    <Link
                                       to={{
                                          pathname: `${path}/${user.uid}`,
                                          state: { user },
                                       }}
                                    >
                                       {user.username}{user.adminUnread && <span style={{ color: "red" }}>•</span>}
                                    </Link>
                                    <div>{user.email}</div>
                                    <div>{date}</div>
                                 </ListGroup.Item>
                              )
                           })}
                        </div>
                     </ListGroup>
                  </Card>
               </div>
            </div>
         </>
      );
   }
}

const UserList2 = withFirebase(UserListBase);

export default UserList2;