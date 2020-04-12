import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import moment from 'moment';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import { SignUpForm } from '../SignUp';

import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Modal from '../Modal';
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
      this.props.firebase.users().off();
   }

   render() {
      const { users, loading } = this.state;
      const style = { width: "100%", maxWidth: "1000px", flex: "1" };

      return (
         <>

            <Modal handleClose={this.handleClose} show={this.state.show} heading={"Add User?"}>
               <SignUpForm handleClose={this.handleClose} />
            </Modal>

            <div className="d-flex justify-content-center">
               <div style={style}>
                  <h1 className="color-white">Users List</h1>

                  <Card className="mb-5">
                     <ListGroup variant="flush" >
                        <ListGroup.Item>
                           <Button className="py-2 my-2" block onClick={this.handleOpen}>Add User</Button>
                        </ListGroup.Item>

                        <ListGroup.Item className="md-hide">
                           <Row className="text-center">
                              <Col xs="12" sm="12" md="3" onClick={this.sortUsersBy("username")}><strong>Username:</strong></Col>
                              <Col xs="12" sm="12" md="3" onClick={this.sortUsersBy("email")}><strong>E-Mail:</strong></Col>
                              <Col xs="12" sm="12" md="3" onClick={this.sortUsersBy("programDate")}><strong>Last Program:</strong></Col>
                              <Col xs="12" sm="12" md="3"><strong>Messages:</strong></Col>
                           </Row>
                        </ListGroup.Item>

                        {users.map(user => {

                           const date = user.programDate ? new Date(user.programDate).toLocaleDateString("en-US") : "-";
                           // const dateString = date.toLocaleDateString("en-US");
                           // const timeString = date.toLocaleTimeString("en-US");

                           return (
                              // <ListGroup.Item key={user.uid} className="d-flex justify-content-between align-items-center">
                              <ListGroup.Item key={user.uid} >
                                 <>
                                    <Row className="text-center">
                                       <Col xs="12" sm="12" md="3" lg="3">
                                          <Link
                                             className="btn btn-link px-0 py-0"
                                             to={{
                                                pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                                state: { user },
                                             }}
                                          >
                                             {user.username}
                                          </Link>
                                       </Col>
                                       <Col xs="12" sm="12" md="3" lg="3">{user.email}</Col>
                                       <Col xs="12" sm="12" md="3" lg="3">{date}</Col>
                                       <Col xs="12" sm="12" md="3" lg="3">

                                          <Link
                                             className="btn btn-link px-0 py-0"
                                             to={{
                                                pathname: `${ROUTES.ADMIN_MESSAGES}/${user.uid}`,
                                                state: { user },
                                             }}
                                          >
                                             Messages {user.adminUnread && <span style={{ color: "red" }}>•</span>}
                                             {/* Messages<Badge variant="light">{user.adminUnread}</Badge> */}
                                             <span className="sr-only">unread messages</span>
                                          </Link>
                                       </Col>
                                    </Row>
                                 </>
                              </ListGroup.Item>
                           )
                        })}

                        {loading && <ListGroup.Item>Loading ...</ListGroup.Item>}

                     </ListGroup>
                  </Card>
               </div>
            </div>
         </>
      );
   }
}

const UserList = withFirebase(UserListBase);

export default UserList;