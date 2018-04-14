import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import {auth} from '../services/auth';

const Nav = (props) => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                {
                    auth.isAuthenticated
                        ? (
                            <Fragment>
                                <li className="nav__element"><Link to='/profile'> Profile</Link></li>
                                <li className="nav__element"><Link to='/logout'>Logout</Link></li>
                            </Fragment>
                        )
                        : <li className="nav__element"><Link to='/login'>Login</Link></li>
                }
            </ul>
        </nav>
    )
};

export {Nav};