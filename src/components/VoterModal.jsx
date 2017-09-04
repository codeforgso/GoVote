import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ButtonGroup,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Modal
} from 'react-bootstrap';

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
    } = props;

    const renderVoterInfo = (el) => {
        return (
            // <Radio name="voterRadioGroup" key={el.voter_reg_num}
            //        onClick={() => _handleRadioClick(el)}>{el.resident_address}</Radio>
            <Button bsStyle="link" key={el.voter_reg_num}
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

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onSubmit;
      }
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
                    <Form >
                        <FormGroup controlId="formFirstName" validationState={null}>
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl type="text" name="firstName" onChange={onUpdate} onKeyPress={handleKeyPress} placeholder="Jane"/>
                        </FormGroup>
                        <FormGroup controlId="formLastName" validationState={null}>
                            <ControlLabel>Last Name</ControlLabel>
                            <FormControl type="text" name="lastName" onChange={onUpdate} onKeyPress={handleKeyPress} placeholder="Doe"/>
                        </FormGroup>
                        <Button type="button" onClick={onSubmit}>
                            Search
                        </Button>
                    </Form>
                    <FormGroup>
                      <ButtonGroup vertical>
                        {voterInfo.map(renderVoterInfo)}
                        {voterInfo.length ? <Button bsStyle="link" onClick={_handleAddressSubmit}>I DON'T SEE MY ADDRESS</Button> : null}
                      </ButtonGroup>
                        {
                            showUserStatus ?
                                renderUserStatus(`VOTER REGISTRATION STATUS: ${selectedAddress.voter_status_desc}`)
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
