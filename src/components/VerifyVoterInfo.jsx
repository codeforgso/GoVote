import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, FormGroup } from 'react-bootstrap';

class VerifyVoterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: {},
      showUserStatus: false,
      mayoralCandidates: ['Nancy Vaughan (i)']
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.voterInfo.length) {
      this.setState({ showUserStatus: false });
    }
  }

  _handleAddressClick = (el) => {
    this.props.voterAddress(el.resident_address);
    this.setState({
      selectedAddress: el,
      showUserStatus: true
    });
    window.scrollTo(0, 0);
  };

  _renderUserStatus = (status) => {
    const upperStatus = status.toUpperCase();
    return (
      <div>
        <b>{upperStatus}</b>
      </div>
    );
  };

  _renderVoterInfo = el => (
    <Button
      name="voterAddressGroup"
      key={el.voter_reg_num}
      onClick={() => this._handleAddressClick(el)}
    >
      {el.resident_address}
    </Button>
  );

  _renderCandidates = candidate => <p>{candidate}</p>;

  render() {
    return (
      <FormGroup>
        {this.props.voterInfo.length ? <h4>Verify Your Address:</h4> : null}
        {this.state.showUserStatus ? (
          <div>
            <br />
            {this._renderUserStatus(
              `ADDRESS SELECTED: ${this.state.selectedAddress.mail_addr1}`
            )}
            <br />
            {this._renderUserStatus(
              `VOTER REGISTRATION STATUS: ${
                this.state.selectedAddress.voter_status_desc
              }`
            )}
          </div>
        ) : null}
        {this.state.showUserStatus && this.state.selectedAddress.ward_abbrv ? (
          <div>
            <br />
            {this._renderUserStatus(
              `GREENSBORO CITY COUNCIL DISTRICT: ${this.state.selectedAddress.ward_abbrv.substring(
                2,
                3
              )}`
            )}
            <br />
            <b>YOUR GREENSBORO CITY COUNCIL CANDIDATES:</b>
            <br />
            <br />
            <b>Mayoral:</b>
            {this.state.mayoralCandidates.map(this._renderCandidates)}
            <br />
          </div>
        ) : null}
        {this.state.showUserStatus && !this.state.selectedAddress.ward_abbrv ? (
          <div>
            <br />
            {this._renderUserStatus('NOT WITHIN GREENSBORO CITY LIMIT')}
          </div>
        ) : null}
        <ButtonGroup vertical>
          {this.props.voterInfo.map(this._renderVoterInfo)}
          {this.props.voterInfo.length ? (
            <Button name="notMyAddress" onClick={this.props.showRegInfoModal}>
              {"I DON'T SEE MY ADDRESS"}
            </Button>
          ) : null}
        </ButtonGroup>
      </FormGroup>
    );
  }
}

VerifyVoterInfo.propTypes = {
  voterInfo: PropTypes.array.isRequired,
  showRegInfoModal: PropTypes.func,
  voterAddress: PropTypes.func
};

export default VerifyVoterInfo;
