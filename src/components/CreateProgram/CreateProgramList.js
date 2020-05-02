import React, { Component } from "react";

// import moment from 'moment';

import { withFirebase } from '../Firebase';
import Modal from '../Modal';

// import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { PROGRAM } from '../../constants/defaultProgram';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

class UserItemBase extends Component {
   constructor(props) {
      super(props);

      this.state = {
         loading: false,
         programTitle: "New Program",
         programIds: [],
         show: false,
         showRemove: false,
         removeKey: 0,
         error: null,
         ...props.location.state,
      };
   }

   handleCreateProgram = (e) => {
      e.preventDefault();
      const timestamp = this.props.firebase.serverValue.TIMESTAMP;
      const programData = PROGRAM(timestamp);
      programData["title"] = this.state.programTitle;

      console.log("creating new program");
      this.props.firebase.programs().push(programData)
         .then((snap) => {
            const key = snap.key;
            this.props.firebase.programIds().update({ [key]: { title: this.state.programTitle, createdAt: timestamp } });
            this.handleClose();
         })
         .catch(error => this.setState({ error }));
   }

   onRemoveProgram = () => {
      const pid = this.state.removeKey;
      this.props.firebase.programId(pid).remove();
      this.props.firebase.program(pid).remove();
      this.handleRemoveClose();
   };

   handleTitleChange = (e) => {
      const { value } = e.target;
      this.setState({ programTitle: value })
   }

   handleClose = () => {
      this.setState({ show: false })
   }

   handleOpen = () => {
      this.setState({ show: true })
   }

   handleRemoveClose = () => {
      this.setState({ removeKey: null, showRemove: false })
   }

   setRemoveKey = (key) => {
      this.setState({ showRemove: true, removeKey: key })
   }

   componentDidMount() {
      this.setState({ loading: true });

      this.props.firebase
         .programIds()
         .on('value', snapshot => {
            const programIdsObject = snapshot.val();

            if (programIdsObject) {
               this.setState({
                  programIds: programIdsObject,
                  loading: false,
               });
            } else {
               this.setState({
                  programIds: [],
                  loading: false,
               });
            }
         });
   }

   componentWillUnmount() {
      this.props.firebase.programs().off();
      this.props.firebase.programIds().off();
   }

   render() {
      const { loading, programIds, error } = this.state;
      const idsArray = Object.keys(programIds).reverse();

      return (
         <>
            <Modal handleClose={this.handleClose} show={this.state.show} heading={"Create New Program"}>

               <Form onSubmit={this.handleCreateProgram}>
                  <Form.Group>
                     <Form.Label>Program Title</Form.Label>
                     <Form.Control
                        type="text"
                        name="programTitle"
                        value={this.state.programTitle}
                        onChange={this.handleTitleChange}
                     />
                  </Form.Group>
                  <Button type="submit" >Add Program</Button>
                  {error && <Alert variant="warning">{error.message}</Alert>}
               </Form>
            </Modal>

            <Modal handleClose={this.handleRemoveClose} show={this.state.showRemove} heading={"Remove Program?"}>
               <Form className="d-flex justify-content-between align-items-center">
                  <Button variant="outline-danger" onClick={this.onRemoveProgram}>Remove</Button>
                  <Button variant="primary" onClick={this.handleRemoveClose}>Cancel</Button>
               </Form>
            </Modal>

            <div className="d-flex justify-content-center">
               <div className="contain-width">
                  <h3>Programs</h3>
                  <ListGroup>
                     <ListGroup.Item>
                        <Button onClick={this.handleOpen} block>Add Program</Button>
                     </ListGroup.Item>

                     {
                        idsArray.map(key => {
                           const date = new Date(programIds[key].createdAt);
                           const dateString = date.toLocaleDateString("en-US");

                           return (
                              <ListGroup.Item className="d-flex justify-content-between align-items-center" key={key}>
                                 <>
                                    <span>
                                       <strong> Title: </strong>
                                       <a href={`${ROUTES.CREATEPROGRAM}/${key}`}>
                                          {programIds[key].title}
                                       </a>
                                       <strong className="ml-2">Date: </strong> {dateString}
                                    </span>
                                    <span>
                                       <Button className="ml-2" variant="outline-danger"
                                          type="button"
                                          onClick={() => this.setRemoveKey(key)}
                                       >
                                          Delete
                                 </Button>
                                    </span>
                                 </>
                              </ListGroup.Item>
                           )
                        }
                        )
                     }
                     {loading && <ListGroup.Item>Loading ...</ListGroup.Item>}
                     {idsArray.length === 0 && <ListGroup.Item>No Programs ...</ListGroup.Item>}
                  </ListGroup>
               </div>
            </div>
         </>
      );
   }
}

// const UserItem = withRouter(withFirebase(UserItemBase));
const UserItem = withFirebase(UserItemBase);

export default UserItem;