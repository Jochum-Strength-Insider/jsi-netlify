import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';


class CodeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptionId: "P-",
      codeTitle: "New Code",
      distountCode: "code",
      codeType: 'discount',
      price: 50,
      error: null,
      edit: false,
      details: [],
    }
  }

  onChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  onCreateCode = (e) => {
    const { codeTitle, subscriptionId, distountCode, price, codeType } = this.state;

    const newCode = {
      "title": codeTitle,
      "subscriptionId": subscriptionId,
      "distountCode": distountCode.toLowerCase(),
      "active": true,
      "price": price,
      "codeType": codeType
    };

    this.props.firebase
      .codes()
      .push(newCode)
      .then((snap) => {
        const key = snap.key;
        this.props.firebase.codeDetails().update({ [key]: { title: codeTitle, submissions: {} } });
      })
      .then(this.props.handleClose)
      .catch(error => {
        this.setState({ error });
      });
    e.preventDefault();
  }

  onSaveEditText = (e) => {
    const { codeTitle, subscriptionId, distountCode, price, codeType } = this.state;
    const { active } = this.props.code;
    const codeUpdate = {
      "title": codeTitle,
      "subscriptionId": subscriptionId,
      "distountCode": distountCode,
      "price": price,
      "codeType": codeType,
      active,
    }
    this.props.onEditCode(this.props.code, codeUpdate)
      .then(this.props.handleClose)
      .catch(error => this.setState({ error }));
    e.preventDefault();
  };

  onSetStateToDefaultProps = (event) => {
    if (event) { event.preventDefault() };

    const { title, subscriptionId, distountCode, price, codeType } = this.props.code;

    this.setState({
      codeTitle: title,
      subscriptionId: subscriptionId,
      distountCode: distountCode,
      price: price,
      codeType: codeType
    })
  }

  fetchDetails = () => {
    this.props.firebase
      .codeDetail(this.props.code.cid)
      .once('value')
      .then((snap) => {
        const detailsObject = snap.val();
        // console.log(detailsObject)

        if (detailsObject) {
          if (detailsObject.submissions) {
            const submissionsArray = Object.keys(detailsObject.submissions).map(key => ({
              ...detailsObject.submissions[key],
            }));

            // console.log(submissionsArray);
            this.setState({ details: submissionsArray })
          }

        }
      })
  }

  toggleEdit = () => {
    this.setState((state) => ({ edit: !state.edit }));
  }

  componentDidMount() {
    if (this.props.code) {
      this.onSetStateToDefaultProps();
      this.fetchDetails();
    }
  }

  render() {
    const { codeTitle, subscriptionId, distountCode, error, price, codeType, edit, details } = this.state;

    return (
      <>
        {edit ? (<Form>
          <Form.Group controlId="formExercise">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name={"codeTitle"}
              onChange={this.onChange}
              value={codeTitle}
            />
          </Form.Group>

          <Form.Group controlId="formLink">
            <Form.Label>Subscription Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="P-"
              name={"subscriptionId"}
              onChange={this.onChange}
              value={subscriptionId}
            />
          </Form.Group>

          <Form.Group controlId="formLink">
            <Form.Label>Distount Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Discount Code"
              name={"distountCode"}
              onChange={this.onChange}
              value={distountCode}
            />
          </Form.Group>

          <Form.Group controlId="formLink">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="50"
              name={"price"}
              onChange={this.onChange}
              value={price}
            />
          </Form.Group>

          <Form.Group controlId="formGridState">
            <Form.Label>Code Type</Form.Label>
            <Form.Control name={'codeType'} as="select" value={codeType} onChange={this.onChange}>
              <option value='discount'>Discount</option>
              <option value='referral'>Referral</option>
            </Form.Control>
          </Form.Group>

          <div className='d-flex justify-content-between'>
            <span>
              <Button className="mr-2" onClick={this.onSaveEditText}>Save</Button>
              <Button onClick={this.onSetStateToDefaultProps}>Reset</Button>
            </span>
            <span>
              <Button onClick={this.toggleEdit}>{edit ? "Details" : "Edit"}</Button>
            </span>
          </div>

          {error && <Alert variant="warning">{error.message}</Alert>}

        </Form>) : (
            <ListGroup className="mb-3">
              {
                details.map(submission => {
                  const date = new Date(submission.create_time);
                  return (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center" key={submission.transaction_id}>
                      <div className="mr-2">{submission.user}</div>
                      {/* <div className="mr-2">{submission.email_address}</div> */}
                      <div>{date.toLocaleDateString()}</div>
                    </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          )
        }

        {
          !edit &&
          <div className='d-flex justify-content-end'>
            <Button onClick={this.toggleEdit}>{edit ? "Details" : "Edit"}</Button>
          </div>
        }

      </>
    )
  }
}

// const detailsObject = {
//   details: {
//     "submissionId": {
//       'transaction_id': id,
//       'create_time': create_time,
//       "email_address": email_address,
//       "user": `${name.surname}, ${name.given_name}`,
//     }
//   }
// }

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(CodeForm);
