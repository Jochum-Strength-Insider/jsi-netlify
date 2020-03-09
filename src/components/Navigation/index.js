import React from 'react';
import logo from "../../images/logo.png";

// import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

// To Do:
// separate users current program from account page
// Create current program page
// Edit account page to have user info
// member since / username / email / etc.

// {/* <Navbar.Brand>
//    <Link to={ROUTES.HOME} >
//       <img
//          src={logo}
//          width="25%"
//          height="25%"
//          className="d-inline-block align-top"
//          alt="Jochum Strength"
//       />
//       Jochum Strength
//             </Link>
// </Navbar.Brand> */}

const Navigation = () => (
   <AuthUserContext.Consumer>
      {authUser =>
         authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)
      }
   </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
   <>
      <Navbar variant="dark" bg="purple" expand="lg" sticky="top">
         <Navbar.Brand href={ROUTES.USERPROGRAM}>
            <img
               src={logo}
               width="120"
               height="40"
               className="d-inline-block align-top"
               alt="Jochum Strength"
            />
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
               <Nav.Link href={ROUTES.USERPROGRAM}>Program</Nav.Link>
               <Nav.Link href={ROUTES.TRACKING}>Tracking</Nav.Link>
               {authUser.ADMIN && (
                  <>
                     <NavDropdown title="Admin" id="basic-nav-dropdown">
                        <NavDropdown.Item href={ROUTES.ADMIN}>Users</NavDropdown.Item>
                        <NavDropdown.Item href={ROUTES.CREATEPROGRAM}>Programs</NavDropdown.Item>
                        <NavDropdown.Item href={ROUTES.CREATETASK}>Exercises</NavDropdown.Item>
                     </NavDropdown>

                  </>
               )}
            </Nav>
            <Nav>
               <Navbar.Text>
                  Signed in as: <a href={ROUTES.ACCOUNT}>{authUser.username}</a>
               </Navbar.Text>
               {/* <Nav.Link href={ROUTES.ACCOUNT}>{authUser.username}</Nav.Link> */}
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   </>
);

const NavigationNonAuth = () => (
   <>
      <Navbar variant="dark" bg="purple" expand="lg" sticky="top">
         <Navbar.Brand href={ROUTES.LANDING}>
            <img
               src={logo}
               width="120"
               height="40"
               className="d-inline-block align-top"
               alt="Jochum Strength"
            />
         </Navbar.Brand>

         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
               <Nav.Link href={ROUTES.LANDING}>Landing</Nav.Link>
               <Nav.Link href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   </>
);

export default Navigation;
