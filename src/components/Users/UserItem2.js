import React, { PureComponent } from "react";

// import moment from 'moment';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

import { withRouter } from 'react-router-dom';
import WorkoutList from '../WorkoutList';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

// import BreadCrumbs from '../BreadCrumbs';

import { ChatRoom } from '../ChatAdmin';

class UserItemBase extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
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

   onSendPasswordResetEmail = () => {
      this.props.firebase.doPasswordReset(this.state.user.email);
   };

   render() {
      const { user, loading } = this.state;
      const memberDate = user ? new Date(user.createdAt) : new Date();
      const memberDateString = memberDate.toLocaleDateString("en-US");
      const programDate = (user && user.programDate) ? new Date(user.programDate) : null;
      const programDateString = programDate ? programDate.toLocaleDateString("en-US") : "-";

      return (
         <div>
            {loading && <div>Loading ...</div>}
            {user && (
               <>
                  <Tabs style={{ marginTop: "12px", marginBottom: "12px" }} fill defaultActiveKey="messages" className="dark-tab user-info">
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
                        </ListGroup>
                     </Tab>
                     <Tab eventKey="workouts" title="Programs">
                        {/* <Switch>
                           <Route exact path={ROUTES.ADMIN_DETAILS} component={WorkoutList} />
                        </Switch> */}
                        <WorkoutList key={user.uid} uid={user.uid} />
                     </Tab>
                     <Tab eventKey="messages" title="Messages">
                        <ChatRoom key={user.uid} user={user} />
                     </Tab>
                  </Tabs>
               </>
            )}
         </div>
      );
   }
}

const UserItem = withRouter(withFirebase(UserItemBase));

export default UserItem;