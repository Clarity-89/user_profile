import React, {Component} from 'react';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        };

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e, type) {
        this.setState({[type]: e.target.value})
    }

    render() {
        let {username, password} = this.state;
        return (
            <div className="login">
                <form className="login__form" noValidate>
                    <h2 className="login__header">Login</h2>
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
                        <input className="login__input login__btn" value="Log in" type="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}