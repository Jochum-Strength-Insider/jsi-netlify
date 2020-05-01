import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';


import { UserItem2 } from '../Users';
// import AdminChatPage from '../ChatAdmin';
// import { ProgramItem } from '../Programs';
// import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';

import { withAuthorization, withEmailVerification } from '../Session';
// import { withAuthorization } from '../Session';
// import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPageMobile = ({ history }) => (
   <>
      <Container fluid>
         <div className="app-top d-flex justify-content-center">
            <div className="contain-width">
               <Row>
                  <Col>
                     {/* <Button onClick={history.goBack} >&#8249;</Button> */}
                     {/* <a href="#" class="previous round">&#8249;</a> */}
                     <Switch>
                        <Route exact path={ROUTES.ADMIN_DETAILS_MOBILE} component={UserItem2} />
                        {/* <Redirect from={ROUTES.ADMIN_DETAILS} to={ROUTES.ADMIN_DETAILS_MOBILE} /> */}
                     </Switch>
                  </Col>
               </Row>
            </div>
         </div>
      </Container>
   </>
);

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withRouter,
   withEmailVerification,
   withAuthorization(condition),
)(AdminPageMobile);
