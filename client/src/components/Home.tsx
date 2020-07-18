import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';

import Navbar from './layout/Navbar';
import TestCard from './TestCard'


export default function Home(): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })
    const [loading, setLoading] = useState(true)
    const [tests, setTests] = useState([])

    useEffect(() => {
        getUser()
        getTests();
    }, []);

    const getUser = async () => {
        try {
            const user = await axios.get('http://localhost:5000/api/auth/user');
            setAuth({ username: user.data.username, loaded: true })
        } catch (_) {
            setAuth({ username: "", loaded: true })
        }
    };

    const getTests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tests/');
            setTests(res.data.reverse())
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    };


    if (auth.loaded && !auth.username) return <Redirect to="/" />;

    return (
        <div>
            <Navbar username={auth.username} />
            <div className="center-container">
                <h4>Your Tests</h4>
                <Link to="/new-test">
                    <button type="button" className="btn btn-dark">
                        New test
                    </button>
                </Link>
                {loading ?
                    (
                        <div className="link">
                            <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>
                        </div>
                    )
                    :
                    (
                        tests.map((test: any) => {
                            return <TestCard key={test._id}
                                id={test._id}
                                title={test.title}
                                language={test.language}
                                date={test.date}
                            />
                        })
                    )
                }
            </div>
        </div>
    )
}
