import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';


import { UserItem2 } from '../Users';
// import AdminChatPage from '../ChatAdmin';
// import { ProgramItem } from '../Programs';
// import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { withAuthorization, withEmailVerification } from '../Session';
// import { withAuthorization } from '../Session';
// import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const style = { width: "100%", maxWidth: "1000px", flex: "1" };

const AdminPageMobile = ({ history }) => (
   <>
      <div className="d-flex justify-content-center">
         <div style={style}>
            <Row>
               <Col>
                  <Button onClick={history.goBack} >Go back</Button>
                  <Switch>
                     <Route exact path={ROUTES.ADMIN_DETAILS_MOBILE} component={UserItem2} />
                     <Redirect from={ROUTES.ADMIN_DETAILS} to={ROUTES.ADMIN_DETAILS_MOBILE} />
                  </Switch>
               </Col>
            </Row>
         </div>
      </div>
   </>
);

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withRouter,
   withEmailVerification,
   withAuthorization(condition),
)(AdminPageMobile);
