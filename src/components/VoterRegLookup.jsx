import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import VoterInfoForm from './VoterInfoForm';
import VoterList from './VoterList';

class VoterRegLookup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVoter: {},
      voterList: [],
      noVoterList: false,
    };
  }

  componentDidMount() {
    console.log(window.localStorage.getItem('VoterRegLookupState'));
    const savedState = JSON.parse(window.localStorage.getItem('VoterRegLookupState'));
    if (savedState) {
      this.setState({ savedState }); // eslint-disable-line react/no-did-mount-set-state
      this.props.returnSelectedVoter(savedState.selectedVoter);
    }
  }

  _saveState() {
    window.localStorage.setItem('VoterRegLookupState', JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        <VoterInfoForm
          returnVoterList={(voterList) => {
            this.setState({ voterList, selectedVoter: {} });
            this._saveState();
            this.props.returnSelectedVoter({});
          }}
        />
        {
          Object.keys(this.state.selectedVoter).length === 0 ?
            <VoterList
              voterList={this.state.voterList}
              returnSelectedVoter={(selectedVoter) => {
                this.setState({ selectedVoter });
                this.props.returnSelectedVoter(selectedVoter);
                this._saveState();
              }}
            />
          :
            <ListGroup>
              <ListGroupItem><b>NAME: </b>{this.state.selectedVoter.first_name} {this.state.selectedVoter.last_name}</ListGroupItem>
              <ListGroupItem><b>ADDRESS: </b>{this.state.selectedVoter.resident_address}</ListGroupItem>
              <ListGroupItem><b>REGISTRATION STATUS: </b>{this.state.selectedVoter.voter_status_desc}</ListGroupItem>
            </ListGroup>
        }
      </div>
    );
  }
}

VoterRegLookup.propTypes = {
  returnSelectedVoter: PropTypes.func.isRequired,
};

export default VoterRegLookup;
