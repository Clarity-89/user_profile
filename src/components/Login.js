import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="login">
                <form className="login__form" noValidate>
                    <h2 className="login__header">Login</h2>
                    <div className="login__field login__field--username">
                        <label className="login__label">
                            <i className="fas fa-user"/>
                            <input className="login__input" name="email" placeholder="Username" value=""
                                   required="required" type="email"/>
                        </label>
                    </div>
                    <div className="login__field login__field--password">
                        <label className="login__label">
                            <i className="fas fa-key"/>
                            <input className="login__input" type="password" name="password" placeholder="Password"
                                   value="" required="required"/>
                        </label>
                        <input className="login__input login__btn" value="Log in" type="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}