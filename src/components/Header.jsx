import React from 'react';
import {
  Col,
  Thumbnail,
} from 'react-bootstrap';
import cfgLogo from '../static/CfGLogoWhite.png';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container-override">
          <Col className="container-heading" xs={6} md={8}>
            <h2 className="main-header">GoVoteGSO Beta</h2>
          </Col>
          <Col className="" xs={6} md={4}>
            <div className="container-logo pull-right">
              <Thumbnail href="http://codeforgreensboro.org" target="_blank" src={cfgLogo} className="logo" />
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

module.exports = Header;
