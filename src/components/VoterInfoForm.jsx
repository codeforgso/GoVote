import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Button, FormControl, Alert } from 'react-bootstrap';
import VerifyVoterInfo from './VerifyVoterInfo';
import { getVoterInfo } from '../actions';

const renderErrors = (el, index) => (
  <li key={index} className="text-danger">Please enter your {el}</li>
);

class VoterInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      voterInfo: [],
      isloading: false,
      voterAddress: '',
      firstNameValidationState: null,
      lastNameValidationState: null,
      formErrors: [],
      voterInfoFound: true,
    };
  }

  _getVoterInfo = () => {
    if (this._validateVoterInput()) {
      this.setState({
        firstNameValidationState: null,
        lastNameValidationState: null,
      });

      this.setState({ isloading: true });

      getVoterInfo(this.state.firstName, this.state.lastName)
        .then((voterInfo) => {
          this.setState({
            voterInfo,
            voterInfoFound: voterInfo.length > 0,
            isloading: false,
          });
        });
    } else {
      this.setState({ voterInfo: [] });
    }
  }

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
  }

  _getVoterAddress = (address) => {
    this.setState({ voterAddress: address });
  }

  _handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      voterInfo: [],
      selectedAddress: {},
      showUserStatus: false,
    });
  }

  render() {
    return (
      <div>
        <Form>
          <h4>Enter your name to find your current voter registration status</h4>
          <FormGroup controlId="formFirstName" validationState={this.state.firstNameValidationState}>
            <ControlLabel>First Name</ControlLabel>
            <FormControl type="text" name="firstName" onChange={this._handleInputChange} placeholder="Jane" />
          </FormGroup>
          <FormGroup controlId="formLastName" validationState={this.state.lastNameValidationState}>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl type="text" name="lastName" onChange={this._handleInputChange} placeholder="Doe" />
          </FormGroup>
          <Button type="button" onClick={this._getVoterInfo}>
            Search
          </Button>
        </Form>
        <FormGroup>
          {
            this.state.formErrors.length ?
              <ul>
                {this.state.formErrors.map(renderErrors)}
              </ul>
            : null
          }
          <br />
          {
            !this.state.voterInfoFound && this.state.formErrors.length === 0 ?
              <Alert bsStyle="warning">No Voter Registration Info Found</Alert>
            : null
          }
          {
            this.state.isLoading && <h3><span className="glyphicon glyphicon-refresh glyphicon-spin"></span> Loading.....</h3>
          }
        </FormGroup>
        <VerifyVoterInfo
          voterInfo={this.state.voterInfo}
          voterAddress={this._getVoterAddress}
        />
      </div>
    );
  }
}

export default VoterInfoForm;
