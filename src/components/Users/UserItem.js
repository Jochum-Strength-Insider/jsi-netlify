import React, { Component } from "react";

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

import { Switch, Route } from 'react-router-dom';
import WorkoutList from '../WorkoutList';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import BreadCrumbs from '../BreadCrumbs';

class UserItemBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         user: null,
         ...props.location.state,
      };
   }

   componentDidMount() {
      if (this.state.user) {
         // console.log(this.state.user);
         return;
      }

      this.setState({ loading: true });

      this.props.firebase
         .user(this.props.match.params.id)
         .on('value', snapshot => {
            const user = snapshot.val();
            if (user) {
               this.setState({
                  user: user,
                  loading: false,
               });
            } else {
               this.setState({
                  user: null,
                  loading: false,
               })
            }

         });
   }

   // handleClose = () => {
   //    this.setState({ show: false });
   // }
   // handleOpen = () => {
   //    this.setState({ show: true });
   // }

   componentWillUnmount() {
      this.props.firebase.user(this.props.match.params.id).off();
   }

   onSendPasswordResetEmail = () => {
      this.props.firebase.doPasswordReset(this.state.user.email);
   };

   render() {
      const { user, loading } = this.state;
      const memberDate = user ? new Date(user.createdAt) : new Date();
      const memberDateString = memberDate.toLocaleDateString("en-US");
      const programDate = user.programDate ? new Date(user.programDate) : null;
      const programDateString = programDate ? programDate.toLocaleDateString("en-US") : "-";

      return (
         <div>

            {loading && <div>Loading ...</div>}

            {user && (
               <>
                  <BreadCrumbs />
                  <h2 className="color-white">User: {user.username}</h2>
                  {/* <Modal handleClose={this.handleClose} show={show} heading={"Remove " + user.username + "?"}>
                     <Form className="d-flex justify-content-between align-items-center">
                        <Button variant="outline-danger" onClick={this.onRemoveUser}>Remove</Button>
                        <Button variant="primary" onClick={this.handleClose}>Cancel</Button>
                     </Form>
                  </Modal> */}
                  <Tabs fill defaultActiveKey="profile" className="dark-tab">
                     <Tab eventKey="profile" title="Profile">
                        <ListGroup className="mb-5">
                           <ListGroup.Item className="no-top-border"><strong>E-Mail:</strong> {user.email}</ListGroup.Item>
                           <ListGroup.Item><strong>Username:</strong> {user.username}</ListGroup.Item>
                           <ListGroup.Item><strong>Member Since:</strong> {memberDateString}</ListGroup.Item>
                           <ListGroup.Item><strong>Last Program:</strong> {programDateString}</ListGroup.Item>
                           <ListGroup.Item>
                              <Button
                                 type="button"
                                 onClick={this.onSendPasswordResetEmail}
                              >
                                 Send Password Reset
                              </Button>
                           </ListGroup.Item>
                           {/* <ListGroup.Item>
                              <Button
                                 type="button"
                                 variant="danger"
                                 onClick={this.handleOpen}
                              >
                                 Delete User
                              </Button>
                           </ListGroup.Item> */}
                        </ListGroup>
                     </Tab>
                     <Tab eventKey="workouts" title="Programs">
                        <Switch>
                           <Route exact path={ROUTES.ADMIN_DETAILS} component={WorkoutList} />
                        </Switch>
                     </Tab>
                  </Tabs>
               </>
            )}
         </div>
      );
   }
}

const UserItem = withFirebase(UserItemBase);

export default UserItem;