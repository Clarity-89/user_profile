import React, {Component} from 'react';
import classNames from 'classnames';

import {ErrorMessage} from "./ErrorMessage";
import {auth} from '../services/auth';
import {login} from '../api/api';

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
            }
        };

        this.handleInput = this.handleInput.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
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
        } else {
            this.setState({errors: {...this.state.errors, formInputEmpty: false}});

            login({
                username: username,
                password: password
            }, this.handleErrors).then(resp => console.log('form submit', resp))
        }
    }

    handleErrors(err) {
        //Reset previously registered errors
        this.setState({errors: {...this.state.errors, incorrectLogin: false, serverError: false}});

        if (err.status === 400) {
            this.setState({errors: {...this.state.errors, incorrectLogin: true}})
        } else if (err.status === 500) {
            this.setState({errors: {...this.state.errors, serverError: true}})
        }
    }

    render() {
        let {username, password} = this.state;
        let {formInputEmpty, serverError, incorrectLogin} = this.state.errors;

        let formClasses = classNames("login__form", {
            "login__form--empty": formInputEmpty
        });

        return (
            <div className="login">
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
                               value="Log in"
                               type="submit"
                               onClick={this.doLogin}
                        />
                    </div>
                </form>
            </div>
        )
    }
}