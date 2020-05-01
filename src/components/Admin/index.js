import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import throttle from 'lodash.throttle';


import { UserList2, UserItem2 } from '../Users';
// import AdminChatPage from '../ChatAdmin';
// import { ProgramItem } from '../Programs';
// import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { withAuthorization, withEmailVerification } from '../Session';
// import { withAuthorization } from '../Session';
// import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';


const AdminPage = ({ isMobile }) => (
   <>
      <Container fluid>
         <div className="app-top d-flex justify-content-center">
            <div className="contain-width">
               <Row>
                  {/* <Col xs="9" className="d-none d-sm-block"> */}
                  <Col xs="12" sm="3">
                     <UserList2 isMobile={isMobile} />
                  </Col>
                  <Col xs="12" sm="9" className="d-none d-sm-block">
                     {
                        isMobile ? (
                           <Switch>
                              {/* <Route exact path={ROUTES.ADMIN} component={UserList} /> */}
                              <Route path={ROUTES.ADMIN_DETAILS} component={() => <UserItem2 isMobile={true} />} />
                              {/* <Route exact path={ROUTES.ADMIN_MESSAGES} component={AdminChatPage} /> */}]
                              {/* Move program item to own page */}
                              {/* <Route exact path={ROUTES.PROGRAM_DETAILS} component={ProgramItem} /> */}
                              {/* <Redirect from={ROUTES.ADMIN_DETAILS} to={ROUTES.ADMIN_DETAILS_MOBILE} /> */}
                           </Switch>
                        ) : (
                              <Switch>
                                 <Route path={ROUTES.ADMIN_DETAILS} component={() => <UserItem2 isMobile={false} />} />
                                 {/* <Route exact path={ROUTES.PROGRAM_DETAILS} component={ProgramItem} /> */}
                              </Switch>
                           )
                     }
                  </Col>
               </Row>
            </div>
         </div>
      </Container>
   </>
);


const AdminPageResponsive = () => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
   // const [screenSize, setScreenSize] = useState(window.innerWidth)

   const resize = () => {
      setIsMobile(window.innerWidth < 576)
      // setScreenSize(window.innerWidth);
   }

   const throttled = useRef(throttle(resize, 200))

   useEffect(() => {
      // const throttledHandleWindowResize = () => {
      //    return throttled.current;
      // }
      const throttledRef = throttled.current;
      window.addEventListener('resize', throttledRef);
      return () => window.removeEventListener('resize', throttledRef);
   }, []);

   return (
      <AdminPage isMobile={isMobile} />
   );
}

const condition = authUser => authUser && authUser.ADMIN;

export default compose(
   withEmailVerification,
   withAuthorization(condition),
)(AdminPageResponsive);
