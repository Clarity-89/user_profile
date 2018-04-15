import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {auth} from '../services/auth';

class Nav extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        auth.logout(() => this.props.history.push('/'));
    }

    render() {

        return (
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__element nav__element--home">
                        <Link className="nav__link" to='/'>Home</Link>
                    </li>

                    {
                        auth.isAuthenticated()
                            ? (
                                <Fragment>
                                    <li className="nav__element">
                                        <Link className="nav__link" to='/profile'>Profile</Link>
                                    </li>
                                    <li className="nav__element">
                                        <button className="nav__btn nav__link" onClick={this.logout}>Logout</button>
                                    </li>
                                </Fragment>
                            )
                            : <li className="nav__element">
                                <Link className="nav__link" to='/login'><i className="fas fa-user"/>Login</Link>
                            </li>
                    }

                </ul>
            </nav>
        )
    }
}

export default withRouter(Nav);