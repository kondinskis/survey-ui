import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse,
  NavbarText,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import UserContext from "../../context/User";

const Topbar = ({ routes }) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <>
      <UserContext.Consumer>
        {(user) => (
          <Navbar color="primary" className="fixed-top" dark expand="md">
            <NavbarBrand href="/">survey</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                {routes
                  .filter((route) => route.title)
                  .map((route, index) => (
                    <NavItem key={index}>
                      <NavLink to={route.path} tag={Link}>
                        <i className={route.icon} /> {route.title}
                      </NavLink>
                    </NavItem>
                  ))}
              </Nav>
              <Nav navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user.sub}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <NavbarText></NavbarText>
            </Collapse>
          </Navbar>
        )}
      </UserContext.Consumer>
    </>
  );
};

export default Topbar;
