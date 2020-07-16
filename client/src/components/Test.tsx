import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import Navbar from './layout/Navbar';


interface Result {
    file1: string,
    file1Percentage: number,
    file2: string,
    file2Percentage: number,
    linesMatched: number
}


interface Props {
    match: any
}


export default function Test({ match }: Props): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })
    const [loading, setLoading] = useState(true)
    const [test, setTest] = useState({} as any)
    const [results, setResults] = useState<Result[]>([])

    useEffect(() => {
        getUser()
        getTest();
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

    const getTest = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/tests/${match.params.testID}`)
            setTest(res.data)
            setResults(res.data.results)
            console.log(`test: ${JSON.stringify(res.data)}`);

        }
        catch (error) {
            console.log(error);
        }

        setLoading(false)
    };


    if (auth.loaded && !auth.username) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Navbar username={auth.username} />
            {loading && ( // TODO: center 
                <div className="link">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>)
            }
            {!loading &&
                <div>
                    <div className="dark-background center-container">
                        <h2>{test.title}</h2>
                        <p>{test.description}</p>
                    </div>
                    <div className="parent">
                        <div className="div1">
                            <h5>Files</h5>
                            <ul className="list-group">
                                <div className="overflow-auto">
                                    {test.files.map((value: any, index: number) => {
                                        return <li key={index}>{value}</li>
                                    })}
                                </div>
                            </ul>
                        </div>
                        <div className="div2">
                            <h5>Base-files</h5>
                            {test.baseFiles.map((value: any, index: number) => {
                                return <li key={index}>{value}</li>
                            })}
                        </div>
                        <div className="div3">
                            <h4>Results</h4>
                            {/* {results.map((value: any, index: number) => {
                                return <li key={index}>{value}</li>
                            })} */}

                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">File 1</th>
                                        <th scope="col">File 1 %</th>
                                        <th scope="col">File 2</th>
                                        <th scope="col">File 2 %</th>
                                        <th scope="col">Lines matched</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((result: Result, index: number) => {
                                        return (<tr>
                                            <th scope="row">{index}</th>
                                            <td>{result.file1}</td>
                                            <td>{result.file1Percentage}</td>
                                            <td>{result.file2}</td>
                                            <td>{result.file2Percentage}</td>
                                            <td>{result.linesMatched}</td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}