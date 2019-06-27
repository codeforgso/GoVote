import React, { Component } from 'react';

export const VoterRegistrationContext = React.createContext();

export class VoterRegistrationProvider extends Component {
  state = {
    voter: null,
  };

  VOTER_STORAGE_KEY = 'VoterRegLookupSelectedVoter';

  componentDidMount() {
    const voter = JSON.parse(
      window.sessionStorage.getItem(this.VOTER_STORAGE_KEY),
    );
    if (voter) {
      this.setState({ voter }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  _saveVoter = (voter) => {
    window.sessionStorage.setItem(
      this.VOTER_STORAGE_KEY,
      JSON.stringify(voter),
    );
  };

  _deleteVoter = () => {
    window.sessionStorage.removeItem(this.VOTER_STORAGE_KEY);
  };

  // Returns polling place address as `STREET_NUM STREET_NAME, CITY, STATE, ZIP`
  _formatPollingPlaceAddress = (voter) => `${voter.polling_place_house_num} ${
    voter.polling_place_street_name
  }, ${voter.polling_place_city}, ${voter.polling_place_state},
                      ${voter.polling_place_zip}
`;

  render() {
    return (
      <VoterRegistrationContext.Provider
        value={{
          voter: this.state.voter,
          setVoter: (voter) => {
            voter.formattedPollingPlaceAddress = this._formatPollingPlaceAddress(
              voter,
            );
            this.setState({ voter });
            this._saveVoter(voter);
          },
          resetVoter: () => {
            this.setState({ voter: null }, () => {
              this._deleteVoter()
            })
          }
        }}
      >
        {this.props.children}
      </VoterRegistrationContext.Provider>
    );
  }
}
