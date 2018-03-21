import React from 'react';
import PropTypes from 'prop-types';

import cfgLogo from '../static/CfGLogoWhite.png';

const Header = ({ showAboutModal, showVoterInfoModal }) => (
  <div className="header">
    <div className="header__title">
      GoVoteGSO
    </div>
    <div className="header__details">
      <div className="header__details-item">
        <button onClick={showAboutModal} className="btn btn-link header__details-action">
          About Us
        </button>
        <button onClick={showVoterInfoModal} className="btn btn-link header__details-action">
          Voter Lookup
        </button>
      </div>
      <div className="header__details-item">
        <img alt="" target="_blank" src={cfgLogo} className="header__details-logo" />
      </div>
    </div>
  </div>
);

Header.propTypes = {
  showVoterInfoModal: PropTypes.func.isRequired,
  showAboutModal: PropTypes.func.isRequired,
};

export default Header;
