import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

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
          <h3>Rerum in aut aut debitis aliquid possimus qui.</h3>
          <p>Quas maiores pariatur magnam dolores ut beatae id voluptas.</p>
          <p>Culpa amet enim quaerat esse aut.</p>
          <p>Consequatur voluptatem omnis fugit nisi. Soluta nulla provident repellat id corporis. Rem sit doloremque. Quo facere alias.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hide} bsStyle="default">Close</Button>
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
