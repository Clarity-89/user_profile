import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './components/Login';
import Profile from './components/Profile';
import {PrivateRoute} from "./components/PrivateRoute";
import Nav from "./components/Nav";
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path='/profile' component={Profile}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
