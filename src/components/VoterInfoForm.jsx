import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Button, FormControl, Alert, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getVoterInfo } from '../actions';

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
      selectedAddress: '',
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
    this.props.returnVerifiedVoter({});
  }

  _handleAddressClick = (el) => {
    this.setState({
      selectedAddress: el,
      showUserStatus: true,
    });
    this.props.returnVerifiedVoter(el);
  }

  _renderVoterInfo = el => (
    <Button name="voterAddressGroup" key={el.voter_reg_num} onClick={() => this._handleAddressClick(el)}>{el.resident_address}</Button>
  )

  _renderNotInCityLimits = () => {
    if (this.state.showUserStatus && !this.state.selectedAddress.ward_abbrv) {
      return (
        <div>
          { 'NOT WITHIN GREENSBORO CITY LIMIT' }
        </div>
      );
    }
    return null;
  }

  _renderSelectedAddress = () => (<p><b>{this.state.selectedAddress.resident_address}</b></p>)

  _renderSelectedRegistrationInfo = () => (
    <p><b>
      {
          this.state.showUserStatus ?
            <div>
              <br />
              {(`VOTER REGISTRATION STATUS: ${this.state.selectedAddress.voter_status_desc}`)}
            </div>
            : null
        }
      {
          this.state.showUserStatus && this.state.selectedAddress.ward_abbrv ?
            <div>
              <br />
              {(`GREENSBORO CITY COUNCIL DISTRICT: ${this.state.selectedAddress.ward_abbrv.substring(2, 3)}`)}
              <br />
              <b>YOUR GREENSBORO CITY COUNCIL CANDIDATES:</b>
              <br />
              <b>Mayoral:</b>
              {this.state.mayoralCandidates.map(this._renderCandidates)}
              <br />
            </div>
            : null
        }
    </b></p>
    )

  _renderCandidates = (candidate, index) => (
    <p key={index}>{candidate}</p>
    )

  _renderErrors = (el, index) => {
    if (this.state.formErrors.length) {
      return (
        <ul>
          {this.state.formErrors.map(() => (<li key={index} className="text-danger">Please enter your {el}</li>))}
        </ul>
      );
    }
    return null;
  }

  _renderNoVoterRegistration = () => {
    if (!this.state.voterInfoFound && this.state.formErrors.length === 0) {
      return (<Alert bsStyle="warning">No Voter Registration Info Found</Alert>);
    }
    return null;
  }

  render() {
    return (
      <div>
        <Form>
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
          { this._renderErrors() }
          <br />
          { this._renderNoVoterRegistration() }
          {
            this.state.isLoading && <h3><span className="glyphicon glyphicon-refresh glyphicon-spin"></span> Loading.....</h3>
          }
        </FormGroup>
        <FormGroup>
          {
          this.state.voterInfo.length ?
            <h4>Verify Your Address:</h4>
            : null
          }
          { this._renderNotInCityLimits() }
          { this._renderSelectedAddress() }
          { this._renderSelectedRegistrationInfo() }
          <ButtonGroup vertical>
            {this.state.voterInfo.map(this._renderVoterInfo)}
            {
              this.state.voterInfo.length ?
                <Button href="/can-i-vote" name="notMyAddress">{'I DON\'T SEE MY ADDRESS'}</Button>
                : null
            }
          </ButtonGroup>
        </FormGroup>
      </div>
    );
  }
}

VoterInfoForm.propTypes = {
  returnVerifiedVoter: PropTypes.func,
};

export default VoterInfoForm;
