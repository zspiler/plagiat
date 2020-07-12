import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';


interface Props {

}

export default function Homepage({ }: Props): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })

    const getUser = async () => {
        try {
            const user = await axios.get('http://localhost:5000/api/auth/user');
            setAuth({ username: JSON.stringify(user.data), loaded: true })
        }
        catch (error) {
            console.log(error);
            setAuth({ username: "", loaded: true })
        }
    };

    const logout = async () => {
        await axios.get('http://localhost:5000/api/auth/logout')
        setAuth({ username: "", loaded: true })
    }

    useEffect(() => {
        getUser();
    }, []);


    if (auth.loaded && !auth.username) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/home"><p className="brand-logo">Plagiat</p></Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#!">Stats</a></li>
                        <li><a href="#!" onClick={logout}>Log Out</a></li>
                    </ul>
                </div>
            </nav>
            <div className="submissions-container">
                <h4>Events</h4>
                <Link to="/new-event">
                    <button type="button" className="btn btn-dark">
                        New event
                </button>
                </Link>
            </div>

            <p>{auth.username}</p>
        </div>
    )
}
