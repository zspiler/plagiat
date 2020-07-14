import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import Navbar from './layout/Navbar';

interface Props {

}

export default function Homepage({ }: Props): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })

    const getUser = async () => {
        try {
            const user = await axios.get('http://localhost:5000/api/auth/user');
            setAuth({ username: user.data, loaded: true })
        }
        catch (error) {
            console.log(error);
            setAuth({ username: "", loaded: true })
        }
    };

    useEffect(() => {
        getUser();
    }, []);


    if (auth.loaded && !auth.username) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Navbar username={auth.username} />
            <div className="center-container">
                <h4>Events</h4>
                <Link to="/new-event">
                    <button type="button" className="btn btn-dark">
                        New event
                </button>
                </Link>
            </div>
        </div>
    )
}
