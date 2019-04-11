import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Button, FormControl, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getVoterInfo } from '../actions';

class VoterInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      firstNameValidationState: null,
      lastNameValidationState: null,
      formErrors: [],
      isloading: false,
      noVoterListFound: false,
    };
  }

  _getVoterInfo = () => {
    if (this._validateVoterInput()) {
      this.setState({
        firstNameValidationState: null,
        lastNameValidationState: null,
        isLoading: true,
      });

      getVoterInfo(this.state.firstName, this.state.lastName)
        .then((voterList) => {
          this.setState({ noVoterListFound: voterList.length === 0 });
          this.props.returnVoterList(voterList);
        })
        .catch(() => {
          this.setState({ formErrors: ['Error retrieving voter registration information. Please try again'] });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
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

  _handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      voterList: [],
      showUserStatus: false,
    });

    this.props.returnVoterList([]);
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
          <Button type="button" onClick={() => { this.props.returnVoterList([]); }}>
            Clear
          </Button>
        </Form>
        <FormGroup>
          <ul>
            {
              this.state.formErrors.map((el, index) => (
                <li key={index} className="text-danger">Please enter your {el}</li>
              ))
          }
          </ul>
          {
            this.state.noVoterListFound &&
              <Alert bsStyle="warning">No Voter Registration Info Found</Alert>
          }
          {
            this.state.isLoading &&
              <h3>
                <span className="glyphicon glyphicon-refresh glyphicon-spin"></span> Loading.....
              </h3>
            }
        </FormGroup>
      </div>
    );
  }
}

VoterInfoForm.propTypes = {
  returnVoterList: PropTypes.func,
};

export default VoterInfoForm;
