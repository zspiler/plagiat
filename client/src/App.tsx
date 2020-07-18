import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import axios from 'axios'

import './App.css';
import './bootstrap.css';
import './materialize.css'

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import About from './components/About'
import CreateTest from './components/CreateTest';
import Landing from './components/Landing';
import Test from './components/Test';
import NotFound from './components/NotFound';


axios.defaults.headers = { 'Content-Type': 'application/json' }
axios.defaults.withCredentials = true

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/new-test" component={CreateTest} />
                <Route exact path="/tests/:testID" component={Test} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}
