import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const VoterModal = (props) => {
  const {
      hide,
      show,
  } = props;

  return (
    <Modal show={show} onHide={hide} bsSize="sm" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          GoVoteGSO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="county-modal-list">
          {props.children}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

VoterModal.propTypes = {
  hide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
};

module.exports = VoterModal;
