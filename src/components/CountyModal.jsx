import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { nc } from '../counties';

// Example of a functional / 'Dumb' component.
// Unaware of state and does not have access to typical React lifecycle methods.
const CountyModal = (props) => {
  const {
    onHide,
  } = props;

  const renderCounty = (county, idx) =>
    <div key={idx}>
      <Button bsStyle="link" href={`/${county}/home`}>
        {county}
      </Button>
    </div>;

  return (
    <Modal {...props} bsSize="sm" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          North Carolina Reentry Resources Hub
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="county-modal-list">
          <h4>Select County for information on services.</h4>
          {nc.map(renderCounty)}
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

CountyModal.propTypes = {
  onHide: PropTypes.func.isRequired,
};

module.exports = CountyModal;
