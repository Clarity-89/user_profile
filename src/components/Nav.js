import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {auth} from '../services/auth';

export default class Nav extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        auth.logout(() => window.history.pushState('', '', '/'));
    }

    render() {
        return (
            <nav className="nav">
                <ul className="nav__list">
                    {
                        auth.isAuthenticated()
                            ? (
                                <Fragment>
                                    <li className="nav__element"><Link to='/profile'> Profile</Link></li>
                                    <li className="nav__element"><a href='#' onClick={this.logout}> Logout</a></li>
                                </Fragment>
                            )
                            : <li className="nav__element"><Link to='/login'>Login</Link></li>
                    }
                </ul>
            </nav>
        )
    }
};