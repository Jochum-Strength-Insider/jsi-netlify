import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptionId: "P-",
      codeTitle: "New Code",
      distountCode: "code",
      codeType: 'discount',
      price: 50,
      error: null,
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
      "distountCode": distountCode,
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

  render() {
    const { codeTitle, subscriptionId, distountCode, error, price, codeType } = this.state;
    return (
      <>
        <Form>
          <Form.Group controlId="formExercie">
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

          <Button onClick={this.onCreateCode} variant="primary">
            Submit
          </Button>

          {error && <Alert variant="warning">{error.message}</Alert>}
        </Form>
      </>
    )
  }
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(AddForm);
