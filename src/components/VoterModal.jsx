import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, ButtonGroup, ControlLabel, Form, FormControl, FormGroup} from 'react-bootstrap';

const VoterModal = (props) => {
    const {
        onHide,
        show,
        onSubmit,
        onUpdate,
        voterInfo,
        _handleAddressClick,
        _handleAddressSubmit,
        selectedAddress,
        showUserStatus,
        firstNameValidationState,
        lastNameValidationState,
        formErrors,
    } = props;

    const renderVoterInfo = (el) => {
        return (
          <Button bsStyle="link" name="voterAddressGroup" key={el.voter_reg_num}
                 onClick={() => _handleAddressClick(el)}>{el.resident_address}</Button>
        );
    }

    const renderUserStatus = (status) => {
        status = status.toUpperCase();
        return (
            <div>
              {status}
            </div>
        );
    }

    const renderErrors = (el, index) => {
        return (
            <li key={index} className="text-danger">Please enter a value for {el}.</li>
        )
    }

    return (
        <Modal show={show} bsSize="lg" aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">
                    GoVoteGSO
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="county-modal-list">
                    <h4>Enter first and last name for your current voter registration status.</h4>
                    <Form inline>
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
                      <ButtonGroup vertical>
                        {voterInfo.map(renderVoterInfo)}
                      </ButtonGroup>
                        {
                            showUserStatus ?
                                renderUserStatus(`VOTER REGISTRATION STATUS: ${selectedAddress.voter_status_desc}`)
                                : null
                        }
                        {
                            formErrors.length ?
                                <ul>
                                    {formErrors.map(renderErrors)}
                                </ul>
                                : null
                        }
                    </FormGroup>
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
    show: PropTypes.bool.isRequired
};

module.exports = VoterModal;
