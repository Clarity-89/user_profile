import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './js/components/Login';
import Profile from './js/components/Profile';
import {Homepage} from "./js/components/Homepage";
import {PrivateRoute} from "./js/components/PrivateRoute";
import Nav from "./js/components/Nav";
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav/>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path='/profile' component={Profile}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
