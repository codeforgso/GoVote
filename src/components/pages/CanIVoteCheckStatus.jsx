import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CanIVoteRegistered from './CanIVoteRegistered';
import VoterInfoForm from '../../components/VoterInfoForm';

export default class CanIVoteCheckStatus extends Component {
  constructor() {
    super();
    this.state = {
      voterStatus: false,
    };
  }

  render() {
    return (
      <div>
        <VoterInfoForm
          returnVerifiedVoter={(voter) => {
            this.setState({ voterStatus: voter.voter_status_desc }, () => {
              window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: 'smooth',
              });
            });
          }}
        />
        {
          this.state.voterStatus === 'ACTIVE' && (
            <CanIVoteRegistered />
          )
        }
        {
            this.state.voterStatus === 'INACTIVE' && (
              <div>
                <h2>You are not registered</h2>
                <ul>
                  <li><Link to="/voter-requirements">Learn more about voter registration and requirements</Link></li>
                  <li><a href="https://www.ncsbe.gov/Voter-Information/VR-Form" target="_blank">NC Board Of Elections Voter Registration Form</a></li>
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}
