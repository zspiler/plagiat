import React, { useState, useEffect, ReactElement } from 'react';
import { Redirect } from 'react-router-dom'
import Navbar from './layout/Navbar';

import axios from 'axios'


// export default function Test({ match }: Props): ReactElement {
//     const history = useHistory()


export default function NotFound(): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUser()
    }, []);

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

    if (auth.loaded && !auth.username) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Navbar username={auth.username} />
            <div style={{ textAlign: 'center' }}>
                <h1>404</h1>
            </div>
        </div>
    );
}
