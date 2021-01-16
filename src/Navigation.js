import React from 'react'
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap'


export default function Navigation (props) {
    return <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">JWIS (Johnson-Werner Inventory System)</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Checkout Items</Nav.Link>
        <Nav.Link href="#link">Add Items</Nav.Link>
        <NavDropdown title="Utilities" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">TBD</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">TBD</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">TBD</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">TBD</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
}