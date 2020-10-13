import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import cfgLogo from "../static/CfGLogoWhite.png";
import gvLogo_long from "../static/gvLogo_long_white.svg";
import routes from "../pages/routes";

const Header = () => (
  <Navbar collapseOnSelect fluid className="header">
    <Navbar.Header className="header__brand">
      <Navbar.Brand className="header__title">
        <Link to="/">
          <img
            src={gvLogo_long}
            alt="Home"
            height="100%"
            className="headerlogo"
          ></img>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {routes.map((route, index) => (
          <NavItem key={index} componentClass="span">
            <Link
              to={route.to}
              key={index}
              className="btn btn-link header__details-action"
            >
              {route.label}
            </Link>
          </NavItem>
        ))}
        <NavItem disabled>
          <a 
            href="https://codeforgreensboro.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Code for Greensboro logo"
              src={cfgLogo}
              className="header__details-logo"/>
          </a>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
