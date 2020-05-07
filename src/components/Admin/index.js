import React from 'react';
import { compose } from 'recompose';

import useResizeWindow from '../../hooks/useResizeWindow';

import AdminPanel from '../AdminPanel'

import { withAuthorization, withEmailVerification } from '../Session';

const AdminPage = () => {
   const isMobile = useResizeWindow(576);

   return (
      <>
         <AdminPanel isMobile={isMobile} />
      </>
   )
};

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(AdminPage);
