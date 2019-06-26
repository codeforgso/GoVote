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
          setVoter: (voter) => this.setState({ voter }), //TODO: handle session storage stuff here
          resetVoter: () => this.setState({ voter: null }),
        }}
      >
        {this.props.children}
      </VoterRegistrationContext.Provider>
    );
  }
}
