import React, {Component} from 'react';
import {
    Button,
    FormGroup,
    Radio,
} from 'react-bootstrap';

class VerifyVoterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRadio: {},
            showUserStatus: false,
        }
    }

    renderVoterInfo = (el) => {
        return (
            <Radio name="voterRadioGroup" key={el.voter_reg_num}
                   onClick={() => this.handleRadioClick(el)}>{el.resident_address}</Radio>
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

    handleRadioSubmit = () => {
        this.setState({
            showUserStatus: true,
        });
    }

    handleRadioClick = (el) => {
        this.setState({
            selectedRadio: el,
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
                {this.props.voterInfo.map(this.renderVoterInfo)}
                {
                    this.props.voterInfo.length ?
                        <div>
                            <Button onClick={this.handleRadioSubmit}>
                                This is my address
                            </Button>
                        </div>
                        : null
                }
                {
                    this.state.showUserStatus && this.props.voterInfo.length ?
                        this.renderUserStatus(`VOTER REGISTRATION STATUS: ${this.state.selectedRadio.voter_status_desc}`)
                        : null
                }
            </FormGroup>
        )
    }
}

export default VerifyVoterInfo;
