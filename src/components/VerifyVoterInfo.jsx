import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, FormGroup } from 'react-bootstrap';

class VerifyVoterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: {},
      showUserStatus: false,
      mayoralCandidates: ['Nancy Vaughan (i)', 'Diane Moffett'],
      atLargeCandidates: ['Marikay Abuzuaiter (i)', 'Mike Barber (i)', 'Yvonne Johnson (i)', 'T. Dianne Bellamy-Small', 'Michelle Kennedy', 'Dave Wils'],
      districtOne: ['Sharon Hightower (i)', 'Paula Ritter-Lipscomb'],
      districtTwo: ['Goldie Wells (i)', 'Jim Kee'],
      districtThree: ['Justin Outling (i)', 'Craig Martin'],
      districtFour: ['Nancy Hoffmann (i)', 'Gary Kenton'],
      districtFive: ['Tony Wilkins (i)', 'Tammi Thurm'],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.voterInfo.length) {
      this.setState({ showUserStatus: false });
    }
  }

  _handleAddressClick = (el) => {
    console.log(el);// eslint-disable-line no-console
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
        <b>{upperStatus}</b>
      </div>
    );
  }

  _renderVoterInfo = (el) => (<Button name="voterAddressGroup" key={el.voter_reg_num} onClick={() => this._handleAddressClick(el)}>{el.resident_address}</Button>);

  _renderCandidates = (candidate) => ( <p>{candidate}</p> );

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
            <div>
              <br />
              {this._renderUserStatus(`VOTER REGISTRATION STATUS: ${this.state.selectedAddress.voter_status_desc}`)}
            </div>
            : null
        }
        {
          this.state.showUserStatus && this.state.selectedAddress.ward_abbrv ?
            <div>
              <br />
              {this._renderUserStatus(`GREENSBORO CITY COUNCIL DISTRICT: ${this.state.selectedAddress.ward_abbrv.substring(2, 3)}`)}
              <br />
              <b>YOUR GREENSBORO CITY COUNCIL CANDIDATES:</b>
              <br />
              <br />
              <b>Mayoral:</b>
              {this.state.mayoralCandidates.map(this._renderCandidates)}
              <br />
              <b>At Large (Vote for three):</b>
              {this.state.atLargeCandidates.map(this._renderCandidates)}
              <br />
              <b>District {this.state.selectedAddress.ward_abbrv.substring(2, 3)}:</b>
              {(() => {
                switch (this.state.selectedAddress.ward_abbrv.substring(2, 3)) {
                  case '1':
                    return this.state.districtOne.map(this._renderCandidates);
                  case '2':
                    return this.state.districtTwo.map(this._renderCandidates);
                  case '3':
                    return this.state.districtThree.map(this._renderCandidates);
                  case '4':
                    return this.state.districtFour.map(this._renderCandidates);
                  case '5':
                    return this.state.districtFive.map(this._renderCandidates);
                  default:
                    return null;
                }
              })()}
            </div>
            : null
        }
        {
          this.state.showUserStatus && !this.state.selectedAddress.ward_abbrv ?
            <div>
              <br />
              {this._renderUserStatus('NOT WITHIN GREENSBORO CITY LIMIT')}
            </div>
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
