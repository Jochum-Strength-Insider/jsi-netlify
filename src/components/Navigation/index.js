import React, { useState, useContext } from 'react';
// import logo from "../../images/logo.png";

import { withRouter } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Badge from 'react-bootstrap/Badge';

const logo = 'https://static.wixstatic.com/media/d44628_dd09c48b517b41fc9d04671db909b022~mv2.png/v1/fill/w_848,h_296,al_c,lg_1,q_85/jochum2%20white.webp';

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

const Navigation = () => {
   const authUser = useContext(AuthUserContext);
   return (
      <Navbar className="navbar" variant="dark" bg="purple" sticky="top" expand="md">
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
      </Navbar>
   )
};

const NavigationAuth = ({ authUser }) => (
   <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="mr-auto">
            <Nav.Link href={ROUTES.USERPROGRAM}>Program</Nav.Link>
            <Nav.Link href={ROUTES.WEIGHIN}>Weight</Nav.Link>
            <Nav.Link href={ROUTES.DIET}>Diet</Nav.Link>
            <Nav.Link href={ROUTES.MESSAGES}>
               {/* Messages {authUser.unread && <Badge variant="light">{authUser.unread}</Badge>} */}
                  Messages {authUser.unread && <span style={{ color: "red" }}>•</span>}
               <span className="sr-only">unread messages</span>
            </Nav.Link>
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
            <Navbar.Text>
               Signed in as: <a href={ROUTES.ACCOUNT}>{authUser.username}</a>
            </Navbar.Text>
            {/* <Nav.Link href={ROUTES.ACCOUNT}>{authUser.username}</Nav.Link> */}
         </Nav>
      </Navbar.Collapse>
   </>
);

const NavigationNonAuth = () => (
   <>
      <Nav className="ml-auto">
         <NavLogin classes={"d-none d-sm-none d-md-none d-lg-inline-flex d-xl-inline-flex"} />
         <Nav.Link className="d-lg-none d-xl-none" href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
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
