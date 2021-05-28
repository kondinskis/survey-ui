import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import UserContext from "../../context/User";

const Topbar = ({ routes }) => {
  const [collapseClasses, setCollapseClasses] = useState("");

  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <>
      <UserContext.Consumer>
        {(user) => (
          <header className="header-global">
            <Navbar
              className="navbar-main navbar-transparent navbar-light headroom"
              expand="lg"
              id="navbar-main"
            >
              <Container>
                <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                  Survey
                </NavbarBrand>
                <button className="navbar-toggler" id="navbar_global">
                  <span className="navbar-toggler-icon" />
                </button>
                <UncontrolledCollapse
                  toggler="#navbar_global"
                  navbar
                  className={collapseClasses}
                  onExiting={() => setCollapseClasses("collapsing-out")}
                  onExited={() => setCollapseClasses("")}
                >
                  <div className="navbar-collapse-header">
                    <Row>
                      <Col className="collapse-brand" xs="6"></Col>
                      <Col className="collapse-close" xs="6">
                        <button className="navbar-toggler" id="navbar_global">
                          <span />
                          <span />
                        </button>
                      </Col>
                    </Row>
                  </div>
                  <Nav
                    className="navbar-nav-hover align-items-lg-center"
                    navbar
                  >
                    <UncontrolledDropdown nav>
                      <DropdownToggle nav>
                        <i className="ni ni-ui-04 d-lg-none mr-1" />
                        <span className="nav-link-inner--text">Manage</span>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-xl">
                        <div className="dropdown-menu-inner">
                          {routes.filter(route => route.title).map((route) => (
                            <Media
                              className="d-flex align-items-center"
                              to={route.path}
                              tag={Link}
                            >
                              <div
                                className={`icon icon-shape bg-gradient-${route.color} rounded-circle text-white`}
                              >
                                <i className={route.icon} />
                              </div>
                              <Media body className="ml-3">
                                <h6
                                  className={`heading text-${route.color} mb-md-1`}
                                >
                                  {route.title}
                                </h6>
                                <p className="description d-none d-md-inline-block mb-0">
                                  {route.description}
                                </p>
                              </Media>
                            </Media>
                          ))}
                        </div>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                  <Nav className="align-items-lg-center ml-lg-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle className="pr-0" nav>
                        <Media className="align-items-center">
                          <i className="fas fa-user text-white"></i>
                          <Media className="ml-2 d-none d-md-block">
                            <span className="mb-0 text-sm font-weight-bold">
                              {user.sub}
                            </span>
                          </Media>
                        </Media>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem onClick={handleLogout}>
                          <span>Logout</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </UncontrolledCollapse>
              </Container>
            </Navbar>
          </header>
        )}
      </UserContext.Consumer>
    </>
  );
};

export default Topbar;
