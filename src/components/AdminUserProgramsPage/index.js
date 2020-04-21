import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { ProgramItem } from '../Programs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

import { withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from '../../constants/routes';

const style = { width: "100%", flex: "1" };

const AdminUserProgramsPage = ({ history }) => (
   <>
      {/* <Button onClick={history.goBack} >Go back</Button> */}
      <div className="d-flex justify-content-center">
         <div style={style}>
            <Row>
               <Col>
                  <Switch>
                     <Route exact path={ROUTES.WORKOUT_DETAILS} component={ProgramItem} />
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
)(AdminUserProgramsPage);
