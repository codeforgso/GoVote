import React, { Component } from 'react';
import VoterInfoForm from '../VoterInfoForm';

class VoterRegLookup extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      selectedAddress: {},
      showUserStatus: false,
      mayoralCandidates: ['Nancy Vaughan (i)'],
    };
  }

  _handleAddressSelect = (selectedAddress) => {
    this.setState({
      selectedAddress,
      showUserStatus: Object.keys(selectedAddress).length > 0,
    }, () => {
      // window.scrollTo(0, document.body.scrollHeight);
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  _getVerifiedAddress = (address) => {
    this.setState({ address });
  }

  _renderUserStatus = (status) => {
    const upperStatus = status.toUpperCase();
    return (
      <div>
        <b>{upperStatus}</b>
      </div>
    );
  }

  _renderCandidates = (candidate, index) => (
    <p key={index}>{candidate}</p>
  )


  render() {
    return (
      <div>
        <h1>Are you registered to vote?</h1>
        <h4>Enter your name to find your current voter registration status</h4>
        <VoterInfoForm
          returnVerifiedVoter={this._handleAddressSelect}
        />
      </div>
    );
  }
}

export default VoterRegLookup;
