import React, {Component} from 'react';

import {api} from '../services/api';
import {auth} from '../services/auth';
import loader from '../../img/loader.svg';

export default class Profile extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            address: '',
            email: '',
            error: false,
            loading: true,
            editing: false
        };

        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.handleError = this.handleError.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let token = auth.getToken();
        api.getProfile(token, this.setData, this.handleError);
    }

    setData(resp) {
        if (resp.ok && resp.body) {
            let {name, email, address} = resp.body;
            this.setState({name: name, address: address, email: email, loading: false});
        }
    }

    handleError() {
        this.setState({error: true, loading: false});
    }

    editProfile() {
        this.setState({editing: true});
    }

    changeAddress(e) {
        this.setState({address: e.target.value});
    }

    updateAddress() {
        let params = {address: this.state.address, token: auth.getToken()};
        api.updateAddress(params, this.cancelUpdate, this.handleError);
    }

    cancelUpdate() {
        this.setState({editing: false});
    }

    /**
     * Save changes on Enter key press
     */
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.updateAddress();
        }
    }

    render() {
        let {name, email, address, loading, editing} = this.state;

        return (
            loading
                ? <div className="loader"><img src={loader} alt="Loader"/></div>
                : (
                    <div className="profile__container">
                        <div className="profile">
                            <h2 className="profile__header">My Profile</h2>
                            <div className="profile__row">
                                <h5 className="profile__title"><i className="fas fa-user"/> Name</h5>
                                <p className="profile__data profile__name">{name}</p>
                            </div>

                            <div className="profile__row">
                                <h5 className="profile__title"><i className="fas fa-map-marker-alt"/> Address</h5>
                                {
                                    editing ? (
                                        <p className="profile__data profile__data--edit">
                                            <input type="text"
                                                   value={address}
                                                   placeholder="Address"
                                                   onChange={this.changeAddress}
                                                   onKeyPress={this.handleKeyPress}
                                            />
                                            <i className="fas fa-save profile__icon profile__icon--save"
                                               onClick={this.updateAddress}
                                            />
                                            <i className="fas fa-times profile__icon profile__icon--cancel"
                                               onClick={this.cancelUpdate}
                                            />
                                        </p>
                                    ) : (
                                        <p className="profile__data">
                                            <span className="profile__address">{address}</span>
                                            <i className="fas fa-pencil-alt profile__icon profile__icon--edit"
                                               onClick={this.editProfile}
                                            />
                                        </p>
                                    )
                                }
                            </div>

                            <div className="profile__row">
                                <h5 className="profile__title"><i className="fas fa-envelope"/> Email</h5>
                                <p className="profile__data profile__email">{email}</p>
                            </div>
                        </div>
                    </div>
                )
        )
    }
}
