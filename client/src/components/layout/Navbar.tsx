import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { ReactElement } from 'react';

interface Props {
    username: String
}

export default function Navbar({ username }: Props): ReactElement {
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
                    <li className="username">Hello, {username}!</li>
                    <li><a href="#!" onClick={logout}>Log Out</a></li>
                </ul>
            </div>
        </nav>
    );
}
