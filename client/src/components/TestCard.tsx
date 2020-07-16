import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';

interface Props {
    id: string,
    title: string
    language: string,
    date: string
}

export default function TestCard({ id, title, language, date }: Props): ReactElement {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{language}</p>
                <p>{date}</p>
                <Link to={`/tests/${id}`}>
                    <button type="button" className="btn btn-outline-danger">
                        Results
                    </button>
                </Link>
            </div>
        </div>
    )
}