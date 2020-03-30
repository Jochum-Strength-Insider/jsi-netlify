import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { UserList, UserItem } from '../Users';
import AdminChatPage from '../ChatAdmin';
import { ProgramItem } from '../Programs';

import { withAuthorization, withEmailVerification } from '../Session';
// import { withAuthorization } from '../Session';
// import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
   <>
      <Switch>
         <Route exact path={ROUTES.ADMIN} component={UserList} />
         <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
         <Route exact path={ROUTES.ADMIN_MESSAGES} component={AdminChatPage} />
         <Route exact path={ROUTES.PROGRAM_DETAILS} component={ProgramItem} />
      </Switch>
   </>
);

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(AdminPage);
