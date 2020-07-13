import React from 'react';
import axios from 'axios'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landingpage from './components/Landingpage';
import Homepage from './components/Homepage';
import CreateEvent from './components/CreateEvent';

import './App.css';
import './bootstrap.css';
import './materialize.css'

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
                <Route exact path="/new-event" component={CreateEvent} />

                {/* <Route component={NotFound} /> */}
            </Switch>
        </Router>
    );
}
