import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {auth} from '../services/auth';


/**
 * A stateless React component for routing to views that require user authentication
 */
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>
);

export {PrivateRoute};