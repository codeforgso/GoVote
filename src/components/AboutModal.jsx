import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Thumbnail,
} from 'react-bootstrap';
import cfgLogo from '../static/CfGLogoWhite.png';

const AboutModal = (props) => {
  const {
    show,
    hide,
  } = props;

  return (
    <div>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>About Code for Greensboro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Code for Greensboro works to improve the way our community uses its data and the web.  And we need <strong>you</strong>—no coding required.</h4>
          <br />
          <p>We are a local 501(c)(3) organization affiliated with the Code for America Brigade program.
            Code for America brigades are volunteer civic tech communities that collaborate with local government and community partners to build open source technology websites, and tools.
            These projects provide greater access to, or augment existing government services, and otherwise help with local civic issues.
            Code for America supports Brigade chapters with resources, tools, and access to the wider civic technology movement.</p>
          <p>We are developers, designers, data nerds, civically - minded people, and residents — in other words, we are this community.
            We want to use this network and these talents to help local government, and the community create positive impact through technology.</p>
        </Modal.Body>
        <Modal.Footer>
          <Thumbnail href="http://codeforgreensboro.org" target="_blank" src={cfgLogo} className="logo about-footer-logo" />
          <Button onClick={hide} bsStyle="default" className="about-footer-btn">Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

AboutModal.propTypes = {
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

module.exports = AboutModal;
