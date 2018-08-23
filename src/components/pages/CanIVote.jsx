import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VoterInfoForm from '../VoterInfoForm';


class CanIVote extends Component {
  constructor() {
    super();
    this.state = {
      voterStatus: false,
    };
  }

  render() {
    return (
      <div>
        <h1>Can I Vote?</h1>
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
            <div>
              <h2>You are registered!</h2>
              <ul>
                <li><Link to="/where-and-when">See Where &amp; When to Vote</Link></li>
                <li><Link to="/candidates">Who are the candidates?</Link></li>
              </ul>
            </div>)
        }
        {
            this.state.voterStatus === 'INACTIVE' && (
              <div>
                <h2>You are not registered</h2>
                <ul>
                  <li><Link to="/voter-requirements">Learn more about voter registration and requirements</Link></li>
                  <li><a href="https://www.ncsbe.gov/Voter-Information/VR-Form" target="_blank">NC Board Of Elections Voter Registration Form</a></li>
                </ul>
              </div>)
        }
      </div>
    );
  }
}

module.exports = CanIVote;
