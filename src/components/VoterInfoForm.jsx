import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';

const VoterInfoForm = (props) => {
  const {
    onSubmit,
    onUpdate,
    firstNameValidationState,
    lastNameValidationState,
    formErrors,
  } = props;

  const renderErrors = (el, index) => { (<li key={index} className="text-danger">Please enter your {el}</li>); };

  return (
    <div>
      <Form>
        <h4>Enter your name for your current voter registration status.</h4>
        <FormGroup controlId="formFirstName" validationState={firstNameValidationState}>
          <ControlLabel>First Name</ControlLabel>
          {' '}
          <FormControl type="text" name="firstName" onChange={onUpdate} placeholder="Jane" />
        </FormGroup>
        {' '}
        <FormGroup controlId="formLastName" validationState={lastNameValidationState}>
          <ControlLabel>Last Name</ControlLabel>
          {' '}
          <FormControl type="text" name="lastName" onChange={onUpdate} placeholder="Doe" />
        </FormGroup>
        {' '}
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
      </FormGroup>
    </div>
  );
};

VoterInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  firstNameValidationState: PropTypes.string,
  lastNameValidationState: PropTypes.string,
  formErrors: PropTypes.array,
};

export default VoterInfoForm;
