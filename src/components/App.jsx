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
            firstName: null,
            lastName: null,
            voterInfo: [],
            layers: {
                councilDist: null,
                commissionerDist: null
            },
            selectedAddress: {},
            showUserStatus: false,
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
        axios.get(`/api/${this.state.firstName}/${this.state.lastName}`, {baseURL: 'http://localhost:3001/'})
            .then((response) => {
                console.log(response.data);
                this.setState({voterInfo: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    _handleAddressClick = (el) => {
        this.setState({
            selectedAddress: el
        }, () => {
          this._handleAddressSubmit();
        })
    }

    _handleAddressSubmit = () => {
        this.setState({
            showUserStatus: true
        });
    }

    _handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            voterInfo: [],
            selectedAddress: {},
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
                                _handleAddressSubmit={this._handleAddressSubmit}
                                _handleAddressClick={this._handleAddressClick} selectedAddress={this.state.selectedAddress}
                                showUserStatus={this.state.showUserStatus}/>
                </div> : null
        );
    }
}

App.propTypes = {
    match: PropTypes.object.isRequired,
};
