import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

import './CardEditor.css';

const nav = (props) => {
  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to="/editor">Card Editor</Link></Nav.Link>
        </Nav>
        <Nav className="ml-auto">
        {props.isLoggedIn ? (
          <div>
            <Navbar.Brand>Account: {props.email}</Navbar.Brand>
            <button onClick={() => props.firebase.logout()}>Logout</button>
          </div>
        ) : (
          <div className="horizontal">
            <Nav.Link><Link to="/login">Login</Link>   <Link to="/register">Register</Link></Nav.Link>
          </div>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state, props) => {
  return {
    names: state.firebase.data.homepage,
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid
  };
}

export default compose(firebaseConnect(['/homepage']), (connect(mapStateToProps)))(nav);
