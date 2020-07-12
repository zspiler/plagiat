import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props { }

export default function Landingpage({ }: Props): ReactElement {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Plagiat</h1>
                <div className="btn-group-vertical">
                    <Link to="/login">
                        <button type="button" className="btn btn-dark">
                            Log In
                        </button>
                    </Link>

                    <Link to="/register">
                        <button type="button" className="btn btn-dark">
                            Register
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    );
}
