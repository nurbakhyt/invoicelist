import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

const Navibar = () => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Invoice App</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem href="/">Invoices</NavItem>
        <NavItem href="/products">Products</NavItem>
        <NavItem href="/customers">Customers</NavItem>
      </Nav>
    </Navbar>
  </div>
)

export default Navibar