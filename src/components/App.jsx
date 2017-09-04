import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MapContainer from './MapContainer';
import VoterModal from './VoterModal.jsx';
import axios from 'axios';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            modalShow: true,
            firstName: '',
            lastName: '',
            voterInfo: [],
            layers: {
                councilDist: null,
                commissionerDist: null
            },
            selectedRadio: {},
            showUserStatus: false,
            firstNameValidationState: null,
            lastNameValidationState: null,
            formErrors: [],
        };
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    componentWillMount() {
        this._getGISData(this.props.match);
    }

    _getCouncilDistricts = () => {
        return axios.get('http://data-greensboro.opendata.arcgis.com/datasets/829c58aaaf0c4bf0b59f93bfe3cb4c13_3.geojson');
    }

    _getCommissionerDistricts = () => {
        return axios.get('http://data-greensboro.opendata.arcgis.com/datasets/1b60f15bb4dc4d8f96bd4831a8fbf063_5.geojson');
    }

    _getGISData = () => {
        axios.all([this._getCouncilDistricts(), this._getCommissionerDistricts()])
            .then(axios.spread((councilDist, commissionerDist) => {
                console.log(councilDist.data, commissionerDist.data);
                this.setState({layers: {councilDist: councilDist.data, commissionerDist: commissionerDist.data}});
            }));
    }

    _getVoterInfo = () => {
        if (this._validateVoterInput()) {
            this.setState({firstNameValidationState: null});
            this.setState({lastNameValidationState: null});
            axios.get(`/api/${this.state.firstName}/${this.state.lastName}`, {baseURL: 'http://localhost:3001/'})
                .then((response) => {
                    this.setState({voterInfo: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            this.setState({voterInfo: []})
        }
    }

    _validateVoterInput = () => {
        let result = true;
        let errors = [];
        if (this.state.firstName === '') {
            this.setState({firstNameValidationState: 'error'});
            errors.push('first name');
            result = false;
        }
        if (this.state.lastName === '') {
            this.setState({lastNameValidationState: 'error'});
            errors.push('last name');
            result = false;
        }
        this.setState({formErrors: errors});
        return result;
    }

    handleRadioClick = (el) => {
        this.setState({
            selectedRadio: el,
            showUserStatus: false,
        });
    }

    handleRadioSubmit = () => {
        this.setState({
            showUserStatus: true,
        });
    }

    _handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            showUserStatus: false
        });
    }

    render() {
        const modalClose = () => this.setState({modalShow: false});
        return (
            this.state.layers.councilDist && this.state.layers.commissionerDist ?
                <div className="map">
                    <MapContainer data={this.state.layers}/>
                    <VoterModal show={this.state.modalShow} onHide={modalClose} onSubmit={this._getVoterInfo}
                                onUpdate={this._handleInputChange} voterInfo={this.state.voterInfo}
                                handleRadioSubmit={this.handleRadioSubmit}
                                handleRadioClick={this.handleRadioClick} selectedRadio={this.state.selectedRadio}
                                showUserStatus={this.state.showUserStatus}
                                firstNameValidationState={this.state.firstNameValidationState}
                                lastNameValidationState={this.state.lastNameValidationState}
                                formErrors={this.state.formErrors}/>
                </div> : null
        );
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired,
};
