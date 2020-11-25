import React, { useState, useContext } from 'react';
import logo from "../../images/logo.png";

import { withRouter, NavLink } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignOutButton } from '../SignOut';

import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import AdminUnreadMessages from '../AdminUnread';

const style = { display: "flex", width: "100%", maxWidth: "1000px", flex: "1", justifyContent: "space-between", flexWrap: "wrap", };

const Navigation = () => {
  const authUser = useContext(AuthUserContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const onSelect = () => setIsExpanded(false);
  const onToggle = () => setIsExpanded(!isExpanded);

  return (
    <Navbar className="navbar justify-content-center" variant="dark" bg="purple" fixed="top" expand="md" expanded={isExpanded} onToggle={onToggle}>
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
        {authUser ? (<NavigationAuth onToggle={onToggle} onSelect={onSelect} isExpanded={isExpanded} authUser={authUser} />) : (<NavigationNonAuth onToggle={onToggle} onSelect={onSelect} isExpanded={isExpanded} />)}
      </div>
    </Navbar>
  )
};

const NavigationAuth = ({ authUser, onSelect }) => {
  return (
    <>
      <Navbar.Toggle aria-controls="basic-navbar-nav" label="Navbar menu toggle" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" onSelect={onSelect}>
          <NavLink className="nav-link" to={ROUTES.USERPROGRAM} onClick={onSelect}>Program</NavLink>

          {authUser.ACTIVE && (
            <>
              <NavLink className="nav-link" to={ROUTES.WEIGHIN} onClick={onSelect}>Weight</NavLink>
              <NavLink className="nav-link" to={ROUTES.DIET} onClick={onSelect}>Diet</NavLink>
              <NavLink className="nav-link" to={ROUTES.MESSAGES} onClick={onSelect}>
                Messages {authUser.unread && <span style={{ color: "red" }}>•</span>}
                <span className="sr-only">unread messages</span>
              </NavLink>
            </>
          )}

          {authUser.ADMIN && (
            <>
              <Nav>
                <Dropdown >
                  <Dropdown.Toggle className='nav-link' variant="link" id="dropdown-basic">
                    Admin
                           </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink className="dropdown-item ignore-active" to={ROUTES.ADMIN} onClick={onSelect}>Users</NavLink>
                    <NavLink className="dropdown-item ignore-active" to={ROUTES.CREATEPROGRAM} onClick={onSelect}>Programs</NavLink>
                    <NavLink className="dropdown-item ignore-active" to={ROUTES.CREATETASK} onClick={onSelect}>Exercises</NavLink>
                    <NavLink className="dropdown-item ignore-active" to={ROUTES.CREATECODE} onClick={onSelect}>Codes</NavLink>
                    {/* <Dropdown.Item onClick={onSelect}><NavLink className="dropdown-item ignore-active" to={ROUTES.ADMIN}>Users</NavLink></Dropdown.Item>
                              <Dropdown.Item onClick={onSelect} href={ROUTES.CREATEPROGRAM}>Programs</Dropdown.Item>
                              <Dropdown.Item onClick={onSelect} href={ROUTES.CREATETASK}>Exercises</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </>
          )}
        </Nav>

        <Nav>
          {
            authUser.ADMIN && <AdminUnreadMessages />
          }

          <Dropdown alignRight>
            <Dropdown.Toggle className='nav-link' variant="link" id="dropdown-basic">
              {authUser.username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <NavLink className="dropdown-item ignore-active" to={ROUTES.ACCOUNT} onClick={onSelect}>Account</NavLink>
              {/* <NavLink className="dropdown-item ignore-active" to={ROUTES.SUBSCRIBE} onClick={onSelect}>Sign Up</NavLink> */}
              <Dropdown.Divider />
              <Dropdown.Item><SignOutButton /></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </>
  )
};

const NavigationNonAuth = ({ onSelect }) => (
  <>
    <Nav>
      <NavLink className="d-none d-lg-block d-xl-block nav-link my-auto ml-2" to={ROUTES.SUBSCRIBE} onClick={onSelect}>Sign Up</NavLink>
    </Nav>

    <Navbar.Toggle aria-controls="basic-navbar-nav" label="Navbar menu toggle" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" onSelect={onSelect}>
        <NavLogin classes={"d-none d-sm-none d-md-none d-lg-inline-flex d-xl-inline-flex"} />
        <NavLink className="d-lg-none d-xl-none nav-link my-auto" to={ROUTES.SUBSCRIBE} onClick={onSelect}>Sign Up</NavLink>
        <NavLink className="d-lg-none d-xl-none nav-link my-auto" to={ROUTES.SIGN_IN} onClick={onSelect}>Sign In</NavLink>
      </Nav>
    </Navbar.Collapse>
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
