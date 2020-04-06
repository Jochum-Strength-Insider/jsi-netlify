import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
// import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';

import EmailSignInPage from '../EmailSignIn';
import PasswordForgetPage from '../PasswordForget';
// import HomePage from '../Home';
import UserProgramPage from '../UserProgramPage';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CreateProgram from '../CreateProgram';
import CreateTask from '../CreateTask';
import TrackingPage from '../TrackingPage';
import UserChat from '../ChatUser';
import AdminChat from '../ChatAdmin';
import Footer from '../Footer';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import Container from 'react-bootstrap/Container';

import "./style.css";

const style = { minHeight: "calc(100vh - 66px)" }

const App = () => (
   <>
      <Router >
         <Navigation />
         <Container fluid className="pt-4" style={style}>
            <Switch>
               <Route exact path={ROUTES.LANDING} component={LandingPage} />
               {/* <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} /> */}
               <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
               <Route exact path={ROUTES.SIGN_IN_LINK} component={EmailSignInPage} />
               <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
               {/* <Route exact path={ROUTES.HOME} component={HomePage} /> */}
               <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
               <Route path={ROUTES.ADMIN} component={AdminPage} />
               <Route path={ROUTES.CREATEPROGRAM} component={CreateProgram} />
               <Route path={ROUTES.CREATETASK} component={CreateTask} />
               <Route path={ROUTES.USERPROGRAM} component={UserProgramPage} />
               <Route path={ROUTES.TRACKING} component={TrackingPage} />
               <Route path={ROUTES.ADMIN_MESSAGES} component={AdminChat} />
               <Route path={ROUTES.MESSAGES} component={UserChat} />
               <Route path="*" component={NoMatch} />
            </Switch>
         </Container>
         <Footer />
      </Router>
   </>
);

const NoMatch = () => (
   <Redirect to="/" />
)

export default withAuthentication(App);
