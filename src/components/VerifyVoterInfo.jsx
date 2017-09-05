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
                 onClick={() => _handleAddressClick(el)}>{el.resident_address}</Button>
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

    _handleAddressSubmit = () => {
        this.setState({
            showUserStatus: true,
        });
    }

    _handleAddressClick = (el) => {
        this.setState({
            selectedAddress: el,
            showUserStatus: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.voterInfo.length) {
            this.setState({showUserStatus: false})
        }
    }

    render() {
        return (
          <FormGroup>
            <ButtonGroup vertical>
              {voterInfo.map(renderVoterInfo)}
            </ButtonGroup>
              {
                  showUserStatus ?
                      renderUserStatus(`VOTER REGISTRATION STATUS: ${selectedAddress.voter_status_desc}`)
                      : null
              }
              {
                  formErrors.length ?
                      <ul>
                          {formErrors.map(renderErrors)}
                      </ul>
                      : null
              }
          </FormGroup>
        )
    }
}

export default VerifyVoterInfo;
