import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';


const VoterModal = (props) => {
    const {
        onHide,
        show,
    } = props;

    return (
        <Modal {...props} show={show} bsSize="sm" aria-labelledby="contained-modal-title-lg">
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
