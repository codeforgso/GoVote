import React, { Component } from 'react';
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

// TODO: jsdoc
const VoterAddresses = ({ voterList, handleSelectedVoter }) => (
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

const SelectedVoterInformation = ({ selectedVoter }) => (
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

const FormErrors = ({ formErrors, noVoterList, isLoading }) => (
  <FormGroup>
    <ul>
      {formErrors.map((el, index) => (
        <li key={index} className="text-danger">
          Please enter your {el}
        </li>
      ))}
    </ul>
    {noVoterList && (
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

// TODO: cleanup this file/components. Use hooks!

class VoterRegLookup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVoter: {},
      voterList: [],
      noVoterList: false,
      firstName: '',
      lastName: '',
      firstNameValidationState: null,
      lastNameValidationState: null,
      formErrors: [],
      isLoading: false,
      noVoterListFound: false,
    };
  }

  _getVoterInfo = async () => {
    if (this._validateVoterInput()) {
      this.setState({
        firstNameValidationState: null,
        lastNameValidationState: null,
        isLoading: true,
      });

      try {
        const voterList = await getVoterInfo(
          this.state.firstName,
          this.state.lastName,
        );
        this.setState({
          noVoterListFound: voterList.length === 0,
          voterList,
        });
      } catch (e) {
        console.error(e);
        this.setState({
          formErrors: [
            'Error retrieving voter registration information. Please try again',
          ],
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  _validateVoterInput = () => {
    let result = true;
    const errors = [];
    if (this.state.firstName === '') {
      this.setState({ firstNameValidationState: 'error' });
      errors.push('first name');
      result = false;
    }
    if (this.state.lastName === '') {
      this.setState({ lastNameValidationState: 'error' });
      errors.push('last name');
      result = false;
    }
    this.setState({ formErrors: errors });
    return result;
  };

  _handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      voterList: [],
    });
  };

  render() {
    return (
      <div>
        <VoterRegistrationContext.Consumer>
          {({ voter, setVoter, resetVoter }) => (
            <React.Fragment>
              <Form>
                <FormGroup
                  controlId="formFirstName"
                  validationState={this.state.firstNameValidationState}
                >
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="firstName"
                    onChange={(event) => {
                      resetVoter()
                      this._handleInputChange(event)
                    }}
                    placeholder="Jane"
                    value={voter ? voter.first_name : this.state.firstName}
                  />
                </FormGroup>
                <FormGroup
                  controlId="formLastName"
                  validationState={this.state.lastNameValidationState}
                >
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="lastName"
                    onChange={(event) => {
                      resetVoter()
                      this._handleInputChange(event)
                    }}
                    placeholder="Doe"
                    value={voter ? voter.last_name : this.state.lastName}
                  />
                </FormGroup>
                <Button
                  type="button"
                  onClick={() => {
                    this._getVoterInfo();
                    resetVoter();
                  }}
                >
                  Search
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    this.setState(
                      {
                        voterList: [],
                        firstName: '',
                        lastName: '',
                      },
                      () => {
                        console.log(this.state);
                        resetVoter();
                      },
                    );
                  }}
                >
                  Clear
                </Button>
                <FormErrors
                  formErrors={this.state.formErrors}
                  noVoterList={this.state.noVoterList}
                  isLoading={this.state.isLoading}
                />
              </Form>
              {!voter ? (
                <VoterAddresses
                  voterList={this.state.voterList}
                  handleSelectedVoter={(selectedVoter) => {
                    setVoter(selectedVoter);
                  }}
                />
              ) : (
                <SelectedVoterInformation selectedVoter={voter} />
              )}
            </React.Fragment>
          )}
        </VoterRegistrationContext.Consumer>
      </div>
    );
  }
}

export default VoterRegLookup;
