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
            loading: true
        };

        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.handleError = this.handleError.bind(this);
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

    render() {
        let {name, email, address, loading} = this.state;

        return (
            loading
                ? <div className="loader"><img src={loader}/></div>
                : (
                    <div className="profile">
                        <h2 className="profile__header">My Profile</h2>
                        <div className="profile__row">
                            <h4 className="profile__title">Name</h4>
                            <p className="profile__data profile__name">{name}</p>
                        </div>

                        <div className="profile__row">
                            <h4 className="profile__title">Address</h4>
                            <p className="profile__data profile__address">{address}</p>
                        </div>

                        <div className="profile__row">
                            <h4 className="profile__title">Email</h4>
                            <p className="profile__data profile__email">{email}</p>
                        </div>
                    </div>
                )
        )
    }
}
