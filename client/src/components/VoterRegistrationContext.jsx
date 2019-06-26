import React, { Component } from 'react';

export const VoterRegistrationContext = React.createContext();

export class VoterRegistrationProvider extends Component {
  state = {
    voter: null,
  };

  render() {
    return (
      <VoterRegistrationContext.Provider
        value={{
          voter: this.state.voter,
          setVoter: (voter) => {
            const formattedPollingPlaceAddress = `${
              voter.polling_place_house_num
            } ${voter.polling_place_street_name}, ${
              voter.polling_place_city
            }, ${voter.polling_place_state},
                      ${voter.polling_place_zip}
`;
            voter.formattedPollingPlaceAddress = formattedPollingPlaceAddress
            this.setState({ voter });
          }, //TODO: handle session storage stuff here
          resetVoter: () => this.setState({ voter: null }),
        }}
      >
        {this.props.children}
      </VoterRegistrationContext.Provider>
    );
  }
}
