import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { loadavg } from 'os';



export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '', });
    const [auth, setAuth] = useState({ username: "", loaded: false })

    const getUser = async () => {
        try {

            const user = await axios.get(
                'http://localhost:5000/api/auth/user'
            );
            setAuth({ username: JSON.stringify(user.data), loaded: true })
        }
        catch (error) {
            console.log(error);
            setAuth({ username: "", loaded: true })
        }

    };

    useEffect(() => {
        getUser();
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/login',
                { username, password }
            );
            // console.log(`/login response: ${JSON.stringify(res.config.data)}`);
            getUser()
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { username, password } = formData;


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
                        placeholder="Password"
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                </div>

                <button type="submit" className="btn btn-outline-danger">
                    Submit
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>

            <p>{auth.username}</p>
        </div>


    );
}
