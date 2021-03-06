import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import classNames from 'classnames';

import {ErrorMessage} from "./ErrorMessage";
import {auth} from '../services/auth';
import {api} from '../services/api';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            errors: {
                formInputEmpty: false,
                incorrectLogin: false,
                serverError: false
            },
            redirect: false,
            loading: false
        };

        this.handleInput = this.handleInput.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
    }

    handleInput(e, type) {
        this.setState({[type]: e.target.value})
    }

    /**
     * Authenticate against the API and save the received token on the client
     */
    doLogin(e) {
        e.preventDefault();
        // Reset form errors
        this.setState({errors: {...this.state.errors, incorrectLogin: false, serverError: false}});
        let {username, password} = this.state;

        if (!username || !password) {
            this.setState({errors: {...this.state.errors, formInputEmpty: true}});
            // Remove form animation after half a second
            setTimeout(() => this.setState({errors: {...this.state.errors, formInputEmpty: false}}), 500)
        } else {
            this.setState({errors: {...this.state.errors, formInputEmpty: false}, loading: true});

            api.login({
                username: username,
                password: password
            })
                .then(resp => this.loginSuccess(resp))
                .catch(error => this.handleErrors(error));
        }
    }

    loginSuccess(resp) {
        let {token} = resp.body;
        if (resp.ok && token) {
            auth.authenticate(token);
            this.setState({redirect: true, loading: false});
        }
    }

    handleErrors(err) {
        //Reset previously registered errors
        this.setState({errors: {...this.state.errors, incorrectLogin: false, serverError: false}, loading: false});

        if (err.status === 400) {
            this.setState({errors: {...this.state.errors, incorrectLogin: true}})
        } else if (err.status === 500) {
            this.setState({errors: {...this.state.errors, serverError: true}})
        }
    }

    render() {
        let {username, password, redirect, loading} = this.state;
        let {formInputEmpty, serverError, incorrectLogin} = this.state.errors;
        let formClasses = classNames("login__form", {
            "login__form--empty": formInputEmpty
        });
        let btnText = loading ? 'Loading...' : 'Login';

        if (auth.isAuthenticated()) {
            return <Redirect to="/profile"/>
        }

        // Redirect to referer or to profile after login
        if (redirect) {
            let redirectTo = this.props.location.state || {pathname: '/profile'};
            return <Redirect to={redirectTo}/>
        }

        return (
            <div className="login">
                <div className="login__wrapper">
                    <form className={formClasses} noValidate>
                        <h2 className="login__header">Login</h2>
                        <ErrorMessage serverError={serverError} incorrectLogin={incorrectLogin}/>
                        <div className="login__field login__field--username">
                            <label className="login__label">
                                <i className="fas fa-user"/>
                                <input className="login__input"
                                       name="email"
                                       placeholder="Username"
                                       value={username}
                                       type="email"
                                       onChange={(e) => this.handleInput(e, 'username')}
                                />
                            </label>
                        </div>
                        <div className="login__field login__field--password">
                            <label className="login__label">
                                <i className="fas fa-key"/>
                                <input className="login__input"
                                       type="password"
                                       name="password"
                                       placeholder="Password"
                                       value={password}
                                       onChange={(e) => this.handleInput(e, 'password')}
                                />
                            </label>

                            <input className="login__input login__btn"
                                   value={btnText}
                                   type="submit"
                                   onClick={this.doLogin}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}