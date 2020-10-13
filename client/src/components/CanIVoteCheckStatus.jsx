import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CanIVoteRegistered from './CanIVoteRegistered';
import VoterRegLookup from './VoterRegLookup';


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
        <VoterRegLookup
          returnSelectedVoter={(voter) => {
            this.setState({ voterStatus: voter.voter_status_desc });
          }}
        />
        {
          this.state.voterStatus === 'ACTIVE' && (
            <CanIVoteRegistered showHeader />
          )
        }
        {
            this.state.voterStatus === 'INACTIVE' && (
              <div>
                <h2>You are not registered</h2>
                <ul>
                  <li>
                    <Link to="/voter-requirements">
                      Learn more about voter registration and requirements
                    </Link>
                  </li>
                  <li>
                    <a 
                      rel="noopener noreferrer" 
                      href="https://www.ncsbe.gov/Voter-Information/VR-Form" 
                      target="_blank">
                        NC Board Of Elections Voter Registration Form
                    </a>
                  </li>
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}
