import React, {Component, Fragment} from 'react';

import {auth} from '../services/auth';

const Nav = (props) => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                {
                    auth.isAuthenticated
                    ? (
                        <Fragment>
                            <li className="nav__element">Profile</li>
                            <li className="nav__element"> Logout</li>
                        </Fragment>
                    )
                    : <li className="nav__element">Login</li>
                }
            </ul>
        </nav>
    )
};

export {Nav};