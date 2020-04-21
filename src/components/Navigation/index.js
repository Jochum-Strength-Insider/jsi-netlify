import React, { useState, useContext } from 'react';
import logo from "../../images/logo.png";

import { withRouter, NavLink } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignOutButton } from '../SignOut';


import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Badge from 'react-bootstrap/Badge';

// const logo = 'https://static.wixstatic.com/media/d44628_dd09c48b517b41fc9d04671db909b022~mv2.png/v1/fill/w_848,h_296,al_c,lg_1,q_85/jochum2%20white.webp';

const Navigation = () => {
   const authUser = useContext(AuthUserContext);
   const style = { display: "flex", width: "100%", maxWidth: "1000px", flex: "1", justifyContent: "space-between", flexWrap: "wrap", };

   return (
      <Navbar className="navbar justify-content-center" variant="dark" bg="purple" sticky="top" expand="md">
         <div style={style}>
            <Navbar.Brand href={authUser ? ROUTES.USERPROGRAM : ROUTES.LANDING}>
               <img
                  src={logo}
                  width="120"
                  height="40"
                  className="d-inline-block align-top"
                  alt="Jochum Strength"
               />
            </Navbar.Brand>
            {authUser ? (<NavigationAuth authUser={authUser} />) : (<NavigationNonAuth />)}
         </div>
      </Navbar>
   )
};

const NavigationAuth = ({ authUser }) => (
   <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" label="Navbar menu toggle" />
      <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="mr-auto">
            <NavLink className="nav-link" to={ROUTES.USERPROGRAM}>Program</NavLink>
            <NavLink className="nav-link" to={ROUTES.WEIGHIN}>Weight</NavLink>
            <NavLink className="nav-link" to={ROUTES.DIET}>Diet</NavLink>
            <NavLink className="nav-link" to={ROUTES.MESSAGES}>
               {/* Messages {authUser.unread && <Badge variant="light">{authUser.unread}</Badge>} */}
                  Messages {authUser.unread && <span style={{ color: "red" }}>•</span>}
               <span className="sr-only">unread messages</span>
            </NavLink>
            {authUser.ADMIN && (
               <>
                  <NavDropdown title="Admin" id="basic-nav-dropdown">
                     <NavDropdown.Item href={ROUTES.ADMIN}>Users</NavDropdown.Item>
                     <NavDropdown.Item href={ROUTES.CREATEPROGRAM}>Programs</NavDropdown.Item>
                     <NavDropdown.Item href={ROUTES.CREATETASK}>Exercises</NavDropdown.Item>
                     {/* <NavDropdown.Item href={ROUTES.ADMIN_MESSAGES}>Admin Messages</NavDropdown.Item> */}
                  </NavDropdown>
               </>
            )}
         </Nav>

         <Nav>
            <Dropdown alignRight>
               <Dropdown.Toggle className='nav-link' variant="link" id="dropdown-basic">
                  {authUser.username}
               </Dropdown.Toggle>
               <Dropdown.Menu>
                  <Dropdown.Item className="text-center" href={ROUTES.ACCOUNT}>Account</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item><SignOutButton /></Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
         </Nav>
      </Navbar.Collapse>
   </>
);

const NavigationNonAuth = () => (
   <>
      <Nav className="ml-auto">
         <NavLogin classes={"d-none d-sm-none d-md-none d-lg-inline-flex d-xl-inline-flex"} />
         <NavLink className="d-lg-none d-xl-none nav-link" to={ROUTES.SIGN_IN}>Sign In</NavLink>
      </Nav>
   </>
);

const NavLoginFormBase = ({ firebase, history, classes }) => {
   const emailRef = React.createRef();
   const passwordRef = React.createRef();
   const [error, setError] = useState(null);

   const onSubmit = (e) => {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (email !== "" && password !== "") {
         firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
               setError(null);
               history.push(ROUTES.USERPROGRAM);
            })
            .catch(error => {
               setError(error);
               history.push(ROUTES.SIGN_IN);
            });
      }
   };

   return (
      <Form className={classes} inline noValidate onSubmit={onSubmit}>
         <Form.Group className="ml-2">
            <Form.Control
               size="sm"
               required
               type="email"
               name="email"
               placeholder="Email Address"
               ref={emailRef}
            />
         </Form.Group>
         <Form.Group >
            <Form.Control
               size="sm"
               required
               className="ml-2"
               type="password"
               name="password"
               ref={passwordRef}
               placeholder="Password"
            />
         </Form.Group >
         <Button
            size="sm"
            className="ml-2"
            variant={!error ? "outline-light" : "warning"}
            type="submit">
            Sign In
         </Button>
      </Form>
   )
};

const NavLogin = withRouter(withFirebase(NavLoginFormBase));

export default Navigation;
