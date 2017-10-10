import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, FormGroup } from 'react-bootstrap';

class VerifyVoterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: {},
      showUserStatus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.voterInfo.length) {
      this.setState({ showUserStatus: false });
    }
  }

  _handleAddressClick = (el) => {
    console.log(el);
    this.props.voterAddress(el.resident_address);
    this.setState({
      selectedAddress: el,
      showUserStatus: true,
    });
  }

  _renderUserStatus = (status) => {
    const upperStatus = status.toUpperCase();
    return (
      <div>
        {upperStatus}
      </div>
    );
  }

  _renderVoterInfo = (el) => {
    return (
      <Button name="voterAddressGroup" key={el.voter_reg_num} onClick={() => this._handleAddressClick(el)}>{el.resident_address}</Button>
    );
  }

  render() {
    return (
      <FormGroup>
        {
        this.props.voterInfo.length ?
          <h4>Verify Your Address:</h4>
          : null
        }
        <ButtonGroup vertical>
          {this.props.voterInfo.map(this._renderVoterInfo)}
          {
          this.props.voterInfo.length ?
            <Button name="notMyAddress" onClick={this.props.showRegInfoModal}>{'I DON\'T SEE MY ADDRESS'}</Button>
            : null
          }
        </ButtonGroup>
        {
          this.state.showUserStatus ?
            this._renderUserStatus(`VOTER REGISTRATION STATUS: ${this.state.selectedAddress.voter_status_desc}`)
            : null
        }
      </FormGroup>
    );
  }
}

VerifyVoterInfo.propTypes = {
  voterInfo: PropTypes.array.isRequired,
  showRegInfoModal: PropTypes.func,
  voterAddress: PropTypes.func,
};

export default VerifyVoterInfo;
