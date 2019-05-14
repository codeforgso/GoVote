import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cfgLogo from '../static/CfGLogoWhite.png';
import routes from './pages/routes';

const Header = () => (
  <Navbar collapseOnSelect fluid className="header">
    <Navbar.Header className="header__brand">
      <Navbar.Brand className="header__title">
        <Link to="/">GoVoteGSO</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {
          routes.map((route, index) => (
            <NavItem key={index} componentClass='span'>
              <Link to={route.to} key={index} className="btn btn-link header__details-action">
                {route.label}
              </Link>
            </NavItem>
          ))
        }
        <NavItem>
          <img alt="" target="_blank" src={cfgLogo} className="header__details-logo" />
        </NavItem>
      </Nav>
    </Navbar.Collapse>

  </Navbar>
);

export default Header;
