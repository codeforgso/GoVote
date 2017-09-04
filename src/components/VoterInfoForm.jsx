import React from 'react';
import {Form, FormGroup, ControlLabel, Button, FormControl} from 'react-bootstrap';

const VoterInfoForm = (props) => {
    const {
        onSubmit,
        onUpdate,
        firstNameValidationState,
        lastNameValidationState,
        formErrors
    } = props;

    const renderErrors = (el, index) => {
        return (
            <li key={index} className="text-danger">Please enter your {el}</li>
        )
    }

    return (
        <div>
            <Form inline>
                <h4>Enter first and last name for your current voter registration status.</h4>
                <FormGroup controlId="formFirstName" validationState={firstNameValidationState}>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl type="text" name="firstName" onChange={onUpdate} placeholder="Jane"/>
                </FormGroup>
                <FormGroup controlId="formLastName" validationState={lastNameValidationState}>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text" name="lastName" onChange={onUpdate} placeholder="Doe"/>
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
            </FormGroup>
        </div>
    )

}

export default VoterInfoForm;