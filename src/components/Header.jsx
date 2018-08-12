import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import cfgLogo from '../static/CfGLogoWhite.png';
import routes from './pages/routes';

const Header = () => (
  <Navbar collapseOnSelect staticTop fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <div className="header__title">
          <Link to="/">GoVoteGSO</Link>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {
          routes.map((route, index) => {
            return (
              <NavItem>
                <Link to={route.to} key={index}>
                  {route.label}
                </Link>
              </NavItem>
            );
          })
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
// <div className="header">
//   <div className="header__title">
//     <Link to="/">GoVoteGSO</Link>
//   </div>
//   <div className="header__details">
//     <div className="header__details-item">
//       {
//         routes.map((route, index) => <Link to={route.to} key={index} className="btn btn-link header__details-action">{route.label}</Link>)
//       }
//     </div>
//     <div className="header__details-item">
//       <img alt="" target="_blank" src={cfgLogo} className="header__details-logo" />
//     </div>
//   </div>
