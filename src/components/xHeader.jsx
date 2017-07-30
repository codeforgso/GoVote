import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Col, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CountyModal from './CountyModal';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
    };
  }

  render() {
    const modalClose = () => this.setState({ modalShow: false });
    const config = this.props.data.config;
    const commonJurisdictionName = config.common_jurisdiction_name;
    let localJurisdictionName = '';

    if (config.local_jurisdiction_name) {
      localJurisdictionName = `${config.local_jurisdiction_name} County`;
    }

    return (
      <div>
        <div className="site-header">
          <div className="header-background-image">
            <div className="title-box">
              <h1>{commonJurisdictionName} Reentry Resources Hub</h1>
              <h1>{localJurisdictionName}</h1>
              <h4>Resources & assistance for those with criminal convictions or returning to the community after incarceration</h4>
            </div>
          </div>
        </div>
        <Navbar default collapseOnSelect>
          <Col md={12}>
            <Navbar.Header>
              <Navbar.Brand>
                <Button bsStyle="link" onClick={() => this.setState({ modalShow: true })}>
                  Select County
                </Button>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to={`/${config.local_jurisdiction}/home`}>
                  <NavItem eventKey={1}>Home</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/housing`}>
                  <NavItem eventKey={2}>Housing</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/jobs`}>
                  <NavItem eventKey={3}>Jobs</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/benefits`}>
                  <NavItem eventKey={4}>Public Benefits</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/health`}>
                  <NavItem eventKey={5}>Health Care</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/education`}>
                  <NavItem eventKey={6}>Education</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/legal`}>
                  <NavItem eventKey={7}>Legal</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/support`}>
                  <NavItem eventKey={8}>Supporting Programs</NavItem>
                </LinkContainer>

                <LinkContainer to={`/${config.local_jurisdiction}/other`}>
                  <NavItem eventKey={9}>Other Resources</NavItem>
                </LinkContainer>

                <LinkContainer to="/contact">
                  <NavItem eventKey={10}>Contact Us</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <Button bsSize="large">
                  <Glyphicon glyph="search" />
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Navbar>
        <CountyModal show={this.state.modalShow} onHide={modalClose} />
      </div>
    );
  }
}

Header.propTypes = {
  config: React.PropTypes.object,
  data: React.PropTypes.object,
};

module.exports = Header;
