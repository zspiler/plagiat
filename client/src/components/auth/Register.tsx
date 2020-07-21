import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

    const [formData, setFormData] = useState({ username: '', password: '', password2: '', });
    const { username, password, password2 } = formData;

    const [auth, setAuth] = useState({ username: "", loaded: false })

    const [processing, setProcessing] = useState(false)

    const [error, setError] = useState("")

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === "" || password === "" || password2 === "") return setError('Please enter all fields')
        if (password !== password2) return setError("Passwords don't match")
        if (password.length < 6) return setError("Password must be at least 6 characters long")

        setProcessing(true)
        try {
            const user = await axios.post(
                '/api/auth/register',
                { username, password }
            );
            setAuth({ username: JSON.stringify(user.data.username), loaded: true })
        } catch (err) {
            setError(err.response.data)
        }
        setProcessing(false)
    };

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (auth.loaded && auth.username) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="form-container">
            <h2>Sign Up</h2>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label>Username</label>

                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Enter username"
                        value={username}
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
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password2"
                        placeholder="Confirm password"
                        value={password2}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-outline-danger">
                    Submit
                </button>
            </form>


            {error !== "" && <div className="error-text"> {error} </div>}

            <div className="link">
                <p>
                    Already have an account? <Link to="/login">Log In</Link>
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
