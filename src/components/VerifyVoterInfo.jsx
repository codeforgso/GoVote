import React, {Component} from 'react';
import {
    Button,
    ButtonGroup,
    FormGroup
} from 'react-bootstrap';

class VerifyVoterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: {},
            showUserStatus: false,
        }
    }

    renderVoterInfo = (el) => {
        return (
            <Button bsStyle="link" name="voterAddressGroup" key={el.voter_reg_num}
                    onClick={() => this._handleAddressClick(el)}>{el.resident_address}</Button>
        );
    }

    renderUserStatus = (status) => {
        status = status.toUpperCase();
        return (
            <div>
                {status}
            </div>
        );
    }

    _handleAddressClick = (el) => {
        this.setState({
            selectedAddress: el,
            showUserStatus: true,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.voterInfo.length) {
            this.setState({showUserStatus: false})
        }
    }

    render() {
      console.log(this.props);
        return (
            <FormGroup>
              {
              this.props.voterInfo.length ?
                <h4>Verify Your Address</h4>
                : null
              }
              <ButtonGroup vertical>
                  {this.props.voterInfo.map(this.renderVoterInfo)}
                  {
                  this.props.voterInfo.length ?
                    <Button bsStyle="link" name="notMyAddress"
                          onClick={this.props.showRegInfoModal}>I DON'T SEE MY ADDRESS</Button>
                          : null
                  }
              </ButtonGroup>
              {
                  this.state.showUserStatus ?
                      this.renderUserStatus(`VOTER REGISTRATION STATUS: ${this.state.selectedAddress.voter_status_desc}`)
                      : null
              }
            </FormGroup>
        )
    }
}

export default VerifyVoterInfo;
