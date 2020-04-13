import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

import { ProgramList, ProgramItem } from '../Programs';

const CreateProgram = () => {
   return (
      <>

         <Switch>
            <Route exact path={ROUTES.CREATEPROGRAM} component={ProgramList} />
            <Route exact path={ROUTES.CREATE_DETAILS} component={ProgramItem} />
         </Switch>

      </>
   )
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withFirebase,
   withAuthorization(condition),
)(CreateProgram);
