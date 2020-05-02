import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


const needsEmailVerification = authUser =>
   authUser &&
   !authUser.emailVerified &&
   authUser.providerData
      .map(provider => provider.providerId)
      .includes('password');

const withEmailVerification = Component => {
   class WithEmailVerification extends React.Component {
      constructor(props) {
         super(props);

         this.state = { isSent: false };
      }

      onSendEmailVerification = (e) => {
         e.preventDefault();
         this.props.firebase
            .doSendEmailVerification()
            .then(() => this.setState({ isSent: true }));
      };

      render() {
         return (
            <AuthUserContext.Consumer>
               {authUser =>
                  needsEmailVerification(authUser) ? (
                     <Container >
                        <Row>
                           <Col className="d-flex justify-content-center align-items-center">
                              <Card style={{ width: "30rem" }}>
                                 <Card.Header className="text-center">
                                    <h3>Email Confirmation</h3>
                                 </Card.Header>
                                 <Card.Body>
                                    <Form onSubmit={this.onSendEmailVerification}>
                                       {this.state.isSent ? (
                                          <p>
                                             E-Mail confirmation sent: Check you E-Mails (Spam
                                             folder included) for a confirmation E-Mail.
                                             Refresh this page once you confirmed your E-Mail.
                                          </p>
                                       ) : (
                                             <p>
                                                Verify your E-Mail: Check you E-Mails (Spam folder
                                                included) for a confirmation E-Mail or send
                                                another confirmation E-Mail.
                                             </p>
                                          )}
                                       <Button disabled={this.state.isSent} block variant="primary" type="submit">
                                          {this.state.isSent ? "Email Confirmation Sent" : "Send confirmation E-Mail"}
                                       </Button>
                                    </Form>
                                 </Card.Body>
                              </Card>
                           </Col>
                        </Row>
                     </Container>
                  ) : (
                        <Component {...this.props} />
                     )
               }
            </AuthUserContext.Consumer>
         );
      }
   }

   return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
