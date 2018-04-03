import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const VoterModal = ({ hide, show, children }) => (
  <Modal show={show} onHide={hide} aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">
        GoVoteGSO
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="county-modal-list">
        {children}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={hide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

VoterModal.propTypes = {
  children: PropTypes.array.isRequired,
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default VoterModal;
