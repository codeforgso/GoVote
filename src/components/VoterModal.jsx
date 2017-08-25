import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

const VoterModal = (props) => {
  const {
    onHide,
    show,
    onSubmit,
    onUpdate
  } = props;

  return (
    <Modal {...props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          GoVoteGSO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="county-modal-list">
          <h4>Enter first and last name for your current voter registration status.</h4>
          <Form inline>
            <FormGroup controlId="formFirstName" validationState={null}>
              <ControlLabel>First Name</ControlLabel>
              <FormControl type="text" name="firstName" onChange={onUpdate} placeholder="Jane" />
            </FormGroup>
            <FormGroup controlId="formLastName" validationState={null}>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl type="text" name="lastName" onChange={onUpdate} placeholder="Doe" />
            </FormGroup>
            <Button type="button" onClick={onSubmit} >
              Search
            </Button>
          </Form>
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

VoterModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

module.exports = VoterModal;
