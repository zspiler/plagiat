import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function Navbar() {
    const history = useHistory();

    const logout = async () => {
        await axios.get('http://localhost:5000/api/auth/logout')
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/home"><p className="brand-logo">Plagiat</p></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#!">Stats</a></li>
                    <li><a href="#!" onClick={logout}>Log Out</a></li>
                </ul>
            </div>
        </nav>
    );
}
