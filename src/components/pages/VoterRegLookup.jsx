import React, { Component } from 'react';
import VoterInfoForm from '../VoterInfoForm';

class VoterRegLookup extends Component {

  render() {
    return (
      <div>
        <h1>Are you registered to vote?</h1>
        <VoterInfoForm />
      </div>
    );
  }
}

export default VoterRegLookup;
