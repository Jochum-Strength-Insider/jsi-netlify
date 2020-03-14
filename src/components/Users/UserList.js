import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class UserListBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         users: [],
         asc: true,
      };
   }

   sortUsersBy = (property) => () => {
      const { users, asc } = this.state;
      const fx = (a, b) => asc ? (a[property] > b[property] ? 1 : -1) : (a[property] < b[property] ? 1 : -1);
      const sortedUsers = users.sort(fx);
      this.setState(state => ({ users: sortedUsers, asc: !state.asc }))
   }

   componentDidMount() {
      this.setState({ loading: true });

      this.props.firebase.users().on('value', snapshot => {
         const usersObject = snapshot.val();

         const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
         }));

         this.setState({
            users: usersList,
            loading: false,
         });
      });
   }

   componentWillUnmount() {
      this.props.firebase.users().off();
   }

   render() {
      const { users, loading } = this.state;

      return (
         <Card>
            <Card.Header>
               <h1>Users List</h1>
            </Card.Header>
            <Card.Body>
               <ListGroup variant="flush" >
                  <ListGroup.Item>
                     <Row className="text-center">
                        <Col xs="12" sm="12" md="3" lg="3" onClick={this.sortUsersBy("username")}><strong>Username:</strong></Col>
                        <Col xs="12" sm="12" md="3" lg="3" onClick={this.sortUsersBy("email")}><strong>E-Mail:</strong></Col>
                        <Col xs="12" sm="12" md="3" lg="3" onClick={this.sortUsersBy("programDate")}><strong>Last Program:</strong></Col>
                        <Col xs="12" sm="12" md="3" lg="3"><strong>Details:</strong></Col>
                     </Row>
                  </ListGroup.Item>
                  {loading && <ListGroup.Item>Loading ...</ListGroup.Item>}

                  {users.map(user => {

                     const date = user.programDate ? new Date(user.programDate).toLocaleDateString("en-US") : "-";
                     // const dateString = date.toLocaleDateString("en-US");
                     // const timeString = date.toLocaleTimeString("en-US");

                     return (
                        // <ListGroup.Item key={user.uid} className="d-flex justify-content-between align-items-center">
                        <ListGroup.Item key={user.uid} >
                           <>

                              <Row className="text-center">
                                 <Col xs="12" sm="12" md="3" lg="3">{user.username}</Col>
                                 <Col xs="12" sm="12" md="3" lg="3">{user.email}</Col>
                                 <Col xs="12" sm="12" md="3" lg="3">{date}</Col>

                                 <Col xs="12" sm="12" md="3" lg="3">
                                    <Link
                                       className="btn btn-outline-primary"
                                       to={{
                                          pathname: `${ROUTES.ADMIN}/${user.uid}`,
                                          state: { user },
                                       }}
                                    >
                                       Details
                              </Link>
                                 </Col>
                              </Row>
                           </>
                        </ListGroup.Item>
                     )
                  })}
               </ListGroup>
            </Card.Body>
         </Card >
      );
   }
}

const UserList = withFirebase(UserListBase);

export default UserList;