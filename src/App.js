import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './components/Login';
import Profile from './components/Profile';
import {PrivateRoute} from "./components/PrivateRoute";

import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path='/profile' component={Profile} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
