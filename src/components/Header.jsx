import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cfgLogo from '../static/CfGLogoWhite.png';

const Header = ({ children }) => (
  <div className="header">
    <div className="header__title">
      <Link to="/">GoVoteGSO</Link>
    </div>
    <div className="header__details">
      <div className="header__details-item">
        {children}
      </div>
      <div className="header__details-item">
        <img alt="" target="_blank" src={cfgLogo} className="header__details-logo" />
      </div>
    </div>
  </div>
);

Header.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Header;
