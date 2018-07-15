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
          returnVerifiedVoter={(selectedAddress) => {
            this.setState({
              selectedAddress,
              showUserStatus: Object.keys(selectedAddress).length > 0,
            }, () => {
              window.scrollTo(0, document.body.scrollHeight);
            });
          }}
        />
        {
          this.state.showUserStatus ?
            <div>
              <br />
              {this._renderUserStatus(`VOTER REGISTRATION STATUS: ${this.state.selectedAddress.voter_status_desc}`)}
            </div>
            : null
        }
        {
          this.state.showUserStatus && this.state.selectedAddress.ward_abbrv ?
            <div>
              <br />
              {this._renderUserStatus(`GREENSBORO CITY COUNCIL DISTRICT: ${this.state.selectedAddress.ward_abbrv.substring(2, 3)}`)}
              <br />
              <b>YOUR GREENSBORO CITY COUNCIL CANDIDATES:</b>
              <br />
              <br />
              <b>Mayoral:</b>
              {this.state.mayoralCandidates.map(this._renderCandidates)}
              <br />
            </div>
            : null
        }
      </div>
    );
  }
}

export default VoterRegLookup;
