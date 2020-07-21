import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '', });
    const { username, password } = formData;

    const [auth, setAuth] = useState({ username: "", loaded: false })

    const [processing, setProcessing] = useState(false)

    const [error, setError] = useState("")
    const [info, setInfo] = useState("")

    useEffect(() => {
        getUser();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === "" || password === "") return setInfo('Please enter all fields')

        setProcessing(true)
        try {
            await axios.post('/api/auth/login', { username, password });
            if (! await getUser()) setError('Wrong username or password')
            setProcessing(false)
        } catch (err) {
            setError(err.response.data)
        }
        setProcessing(false)
    };

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getUser = async () => {
        try {
            const user = await axios.get('/api/auth/user');
            setAuth({ username: JSON.stringify(user.data), loaded: true })
        } catch (_) {
            setAuth({ username: "", loaded: true })
            return false
        }
    };


    if (auth.loaded && auth.username) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="form-container">
            <h2>Log In</h2>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-outline-danger">
                    Submit
                </button>
            </form>

            {error !== "" && <div className="error-text"> {error} </div>}

            {info !== "" && <div className="info-text"> {info} </div>}

            <div className="link">
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>

            {processing &&
                <div>
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            }

        </div>
    );
}
