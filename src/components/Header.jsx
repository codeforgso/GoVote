import React from 'react';
import {
  Col,
  Image,
} from 'react-bootstrap';
import cfgLogo from '../static/CfGLogoWhite.png';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container container-override">
          <Col className="container-heading" xs={6} lg={8}>
            <h2 className="main-header">GoVoteGSO</h2>
          </Col>
          <Col className="" xs={6} lg={4}>
            <div className="container-logo pull-right">
              <Image src={cfgLogo} className="logo" />
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

module.exports = Header;
