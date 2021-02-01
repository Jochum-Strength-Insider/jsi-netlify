import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import Landing from '../Landing';
import EmailSignInPage from '../EmailSignIn';
import PasswordForgetPage from '../PasswordForget';
import UserProgramPage from '../UserProgramPage';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CreateProgram from '../CreateProgram';
import CreateTask from '../CreateTask';
import CreateCodes from '../CodesPage';
import DietPage from '../DietPage';
import WeighInPage from '../WeighInPage';
import UserChat from '../ChatUser';
import AdminChat from '../ChatAdmin';
import Payment from '../Payment';
import AdminUserProgramsPage from '../AdminUserProgramsPage';
import SignUpWithPayment from '../SignUpWithPayment';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import Container from 'react-bootstrap/Container';

import "./style.css";

const App = ({ location }) => {
  const includeNavigation = location.pathname !== ROUTES.SIGN_UP;
  const includeClass = includeNavigation ? "switch-container" : "";
  return (
    <>
      <Router>
        <div className={`${includeClass}`}>
          {includeNavigation && <Navigation />}
          <Container fluid className="contain no-padding">
            <Switch>
              <Route exact path={ROUTES.LANDING} component={Landing} />
              <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route exact path={ROUTES.SIGN_IN_LINK} component={EmailSignInPage} />
              <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route path={ROUTES.CREATEPROGRAM} component={CreateProgram} />
              <Route path={ROUTES.CREATETASK} component={CreateTask} />
              <Route path={ROUTES.CREATECODE} component={CreateCodes} />
              <Route path={ROUTES.USERPROGRAM} component={UserProgramPage} />
              <Route path={ROUTES.WORKOUTS} component={AdminUserProgramsPage} />
              <Route path={ROUTES.DIET} component={DietPage} />
              <Route path={ROUTES.WEIGHIN} component={WeighInPage} />
              <Route path={ROUTES.ADMIN_MESSAGES} component={AdminChat} />
              <Route path={ROUTES.MESSAGES} component={UserChat} />
              <Route path={ROUTES.SUBSCRIBE} component={Payment} />
              <Route path={ROUTES.SIGN_UP} component={SignUpWithPayment} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Container>
        </div>
      </Router>
    </>
  )
};

const NoMatch = () => (
  <Redirect to="/" />
)

export default withRouter(withAuthentication(App));
