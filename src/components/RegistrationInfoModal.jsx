import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';


const RegistrationInfoModal = (props) => {
  const {
      onHide,
      show,
  } = props;

  return (
    <Modal {...props} show={show} bsSize="lg" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          NC Voter Registration Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="registration-modal-info">
          <h1>I will tell you what you need to know to GoVote!</h1>
          <h3>In the meantime, start with the NC Board of Elections Voter Registration site <a href="https://www.ncsbe.gov/Voters/Registering-to-Vote" target="_blank">here</a>.</h3>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

RegistrationInfoModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

module.exports = RegistrationInfoModal;
