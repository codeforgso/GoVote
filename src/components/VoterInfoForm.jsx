import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, ControlLabel, Button, FormControl, Alert } from 'react-bootstrap';

const VoterInfoForm = (props) => {
  const {
    firstNameValidationState,
    formErrors,
    lastNameValidationState,
    onSubmit,
    onUpdate,
    voterInfoFound,
  } = props;

  const renderErrors = (el, index) => (
    <li key={index} className="text-danger">Please enter your {el}</li>
  );

  return (
    <div>
      <Form>
        <h4>Enter your name for your current voter registration status.</h4>
        <FormGroup controlId="formFirstName" validationState={firstNameValidationState}>
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="text" name="firstName" onChange={onUpdate} placeholder="Jane" />
        </FormGroup>
        <FormGroup controlId="formLastName" validationState={lastNameValidationState}>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="text" name="lastName" onChange={onUpdate} placeholder="Doe" />
        </FormGroup>
        <Button type="button" onClick={onSubmit}>
          Search
        </Button>
      </Form>
      <FormGroup>
        {
          formErrors.length ?
            <ul>
              {formErrors.map(renderErrors)}
            </ul>
          : null
        }
        <br />
        {
          !voterInfoFound && formErrors.length === 0 ?
            <Alert bsStyle="warning">No Voter Registration Info Found</Alert>
          : null
        }
      </FormGroup>
    </div>
  );
};

VoterInfoForm.propTypes = {
  firstNameValidationState: PropTypes.string,
  formErrors: PropTypes.array,
  lastNameValidationState: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  voterInfoFound: PropTypes.bool,
};

export default VoterInfoForm;
