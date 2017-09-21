import React from 'react';
import {
  Col,
  Image,
} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <div className="container container-override">
        <Col className="container-heading" xs={6} lg={8}>
          <h2 className="main-header">GoVoteGSO</h2>
        </Col>
        <Col className="" xs={6} lg={4}>
          <div className="container-logo pull-right">
            <Image src="../static/CfGLogo.png" className="logo" />
          </div>
        </Col>
      </div>
    );
  }
}

module.exports = Header;
