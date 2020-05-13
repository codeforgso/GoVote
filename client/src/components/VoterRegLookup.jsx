import React, { useState, useContext, useEffect } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
  Alert,
  ButtonGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getVoterInfo } from '../actions';
import { VoterRegistrationContext } from './VoterRegistrationContext';

function VoterRegForm({ resetVoter, voter, setVoterList }) {
  const [noVotersFound, setNoVotersFound] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState({ value: '', validation: null });
  const [lastName, setLastName] = useState({ value: '', validation: null });
  useEffect(() => { // Hydrates form
    if(voter && firstName.value === '' && lastName.value === '') {
      setFirstName({...firstName, value: voter.first_name})
      setLastName({...lastName, value: voter.last_name})
    }
  })

  const handleInputChange = (previousVal, setter) => (event) => {
    resetVoter();
    setVoterList([]);
    setter({ ...previousVal, value: event.target.value });
  };

  const validateInput = () => {
    let isValid = true;
    if (firstName.value === '') {
      setFirstName({ ...firstName, validation: 'error' });
      setFormErrors([...formErrors, 'Please enter your first name']);
      isValid = false;
    }
    if (lastName.value === '') {
      setLastName({ ...lastName, validation: 'error' });
      setFormErrors([...formErrors, 'Please enter your last name']);
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateInput()) {
      try {
        setIsLoading(true);
        setFormErrors([]);
        const voterList = await getVoterInfo(firstName.value, lastName.value);
        resetVoter();
        setVoterList(voterList ? voterList : []);
        setNoVotersFound(!voterList.length);
      } catch (e) {
        setFormErrors([
          'Error retrieving voter registration information. Please try again',
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClear = () => {
    setVoterList([]);
    setFirstName({ value: '', validation: null });
    setLastName({ value: '', validation: null });
    resetVoter();
  };

  const FormErrors = ({ formErrors, noVotersFound, isLoading }) => (
    <FormGroup>
      <ul>
        {formErrors.map((el, index) => (
          <li key={index} className="text-danger">
            {el}
          </li>
        ))}
      </ul>
      {noVotersFound && (
        <Alert bsStyle="warning">No Voter Registration Info Found</Alert>
      )}
      {isLoading && (
        <h3>
          <span className="glyphicon glyphicon-refresh glyphicon-spin" />{' '}
          Loading.....
        </h3>
      )}
    </FormGroup>
  );

  return (
    <Form>
      <FormGroup
        controlId="formFirstName"
        validationState={firstName.validation}
      >
        <ControlLabel>First Name</ControlLabel>
        <FormControl
          autoFocus
          type="text"
          name="firstName"
          onChange={handleInputChange(firstName, setFirstName)}
          placeholder="Jane"
          value={firstName.value}
        />
      </FormGroup>
      <FormGroup controlId="formLastName" validationState={lastName.validation}>
        <ControlLabel>Last Name</ControlLabel>
        <FormControl
          type="text"
          name="lastName"
          onChange={handleInputChange(lastName, setLastName)}
          placeholder="Doe"
          value={lastName.value}
        />
      </FormGroup>
      <Button type="button" onClick={handleSubmit}>
        Search
      </Button>
      <Button type="button" onClick={handleClear}>
        Clear
      </Button>
      <FormErrors
        formErrors={formErrors}
        noVotersFound={noVotersFound}
        isLoading={isLoading}
      />
    </Form>
  );
}

// TODO: jsdoc
const VoterAddressList = ({ voterList, handleSelectedVoter }) => (
  <div>
    {voterList.length > 0 && <h3>Verify Your Address:</h3>}
    <ButtonGroup vertical>
      {voterList.map((el) => (
        <Button
          name="voterAddressGroup"
          key={el.voter_reg_num}
          onClick={() => handleSelectedVoter(el)}
        >
          {el.resident_address}
        </Button>
      ))}
      {voterList.length > 0 && (
        <Link to="/voter-requirements">
          <Button name="notMyAddress">{"I DON'T SEE MY ADDRESS"}</Button>
        </Link>
      )}
    </ButtonGroup>
  </div>
);

const VoterRegistrationInfo = ({ selectedVoter }) => (
  <ListGroup>
    <ListGroupItem>
      <b>NAME: </b>
      {selectedVoter.first_name} {selectedVoter.last_name}
    </ListGroupItem>
    <ListGroupItem>
      <b>ADDRESS: </b>
      {selectedVoter.resident_address}
    </ListGroupItem>
    <ListGroupItem>
      <b>REGISTRATION STATUS: </b>
      {selectedVoter.voter_status_desc}
    </ListGroupItem>
  </ListGroup>
);

function VoterRegLookup() {
  const [voterList, setVoterList] = useState([]);
  const { voter, setVoter, resetVoter } = useContext(VoterRegistrationContext);

  return (
    <div>
      <VoterRegForm
        voter={voter}
        resetVoter={resetVoter}
        setVoterList={setVoterList}
      />
      {!voter ? (
        <VoterAddressList
          voterList={voterList}
          handleSelectedVoter={setVoter}
        />
      ) : (
        <VoterRegistrationInfo selectedVoter={voter} />
      )}
    </div>
  );
}

export default VoterRegLookup;
