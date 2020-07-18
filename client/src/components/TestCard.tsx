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
                <div className="button-stack">
                    <Link to={`/tests/${id}`}>
                        <div className="btn btn-outline-info inline">
                            Results
                        </div>
                    </Link>
                </div>
            </div>
        </div >
    )
}