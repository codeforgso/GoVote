import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';


const RegistrationInfoModal = (props) => {
  const {
      onHide,
      show,
  } = props;

  return (
    <Modal {...props} show={show} bsSize="lg" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">
          NC Voter Registration Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="registration-modal-info">
          <h1>I will tell you what you need to know to GoVote!</h1>
          <h3>To register to vote, please visit
            the <a href="http://www.ncsbe.gov/Voter-Information/VR-Form" target="_blank">NC Board of Elections Voter Registration site</a> to see step by step instructions!
          </h3>
          <ul>
            <li>
              Here they make it easy and provide you with all the
              necessesary forms and information to register to vote. (English & Español)
            </li>
            <li>
              You can look up the <a href="https://vt.ncsbe.gov/BOEInfo" target="_blank">mailing address for your County Board of Elections</a> so you
              can mail in your completed registration form.
            </li>
            <li>
              If you have moved recently and have not updated your address, you can do so easily on the <a href="http://www.ncsbe.gov/updating-registration">Updating Registration page.</a>
            </li>
            <li>
              Please be sure to check the <a href="http://www.ncsbe.gov/Elections/Election-Information/Voter-ID-Requirements" target="_blank">voter ID requirements page</a> to
              make sure you have everything you need for election day.
            </li>
          </ul>
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

RegistrationInfoModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

module.exports = RegistrationInfoModal;
