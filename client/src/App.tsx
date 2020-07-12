import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landingpage from './components/Landingpage';
import Homepage from './components/Homepage';
import axios from 'axios'

import './App.css';
import './bootstrap.css';
import './materialize.css'
import NewEvent from './components/NewEvent';

axios.defaults.headers = { 'Content-Type': 'application/json' }
axios.defaults.withCredentials = true

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landingpage} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Homepage} />
                <Route exact path="/new-event" component={NewEvent} />

                {/* <Route component={NotFound} /> */}
            </Switch>
        </Router>
    );
}
