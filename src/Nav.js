import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const nav = (props) => {
  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to="/editor">Card Editor</Link></Nav.Link>
          <Nav.Link><Link to="/viewer">Card Viewer</Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default nav;
