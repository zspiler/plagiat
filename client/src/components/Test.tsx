import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import Navbar from './layout/Navbar';

import CytoscapeComponent from 'react-cytoscapejs';

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
    const history = useHistory()

    const [auth, setAuth] = useState({ username: "", loaded: false })
    const [loading, setLoading] = useState(true)
    const [test, setTest] = useState({} as any)
    const [results, setResults] = useState<Result[]>([])
    const [elements, setElements] = useState<any[]>([])

    useEffect(() => {
        getUser()
        getTest();
    }, []);

    const getUser = async () => {
        try {
            const user = await axios.get('/api/auth/user');
            setAuth({ username: user.data.username, loaded: true })
        } catch (_) {
            setAuth({ username: "", loaded: true })
        }
    };


    const getTest = async () => {
        try {
            const res = await axios.get(`/api/tests/${match.params.testID}`)
            setTest(res.data)
            setResults(res.data.results)

            // Set data for graph
            if (res.data.results.length > 0) {
                let arr = []
                for (var i = 0; i < res.data.files.length; i++) {
                    arr.push({ data: { id: res.data.files[i], label: res.data.files[i] }, css: { color: `rgb(240,240,240)` } });
                }
                for (var i = 0; i < res.data.results.length; i++) {
                    const pair = res.data.results[i]
                    const red = (255 * ((pair.file1Percentage + pair.file2Percentage) / 200))
                    arr.push({
                        data: { source: pair.file1, target: pair.file2 }, style: {
                            lineColor: `rgb(${red},0,0)`
                        }
                    });
                }

                setElements(arr)
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false)
    };

    const deleteTest = async () => {
        try {
            await axios.delete(`/api/tests/${match.params.testID}`);
            history.push('/home')
        } catch (err) {
            alert(err.response.data)
        }
    }


    if (auth.loaded && !auth.username) return <Redirect to="/" />;
    if (!loading && !test.files) return <Redirect to="/NotFound" />

    return (
        <div>
            <Navbar username={auth.username} />
            {loading && (
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
                        <h3>{test.title}</h3>
                        <p>{test.description}</p>
                        <button className="btn btn-outline-danger button-margin" onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?'))
                                deleteTest()
                        }}>
                            Delete Test
                        </button>
                    </div>
                    <div className="parent-test">
                        <div className="div1-test">
                            <h4>Files</h4>
                            <ul className="list-group">
                                {test.files.map((value: any, index: number) => {
                                    return <li key={index} className="list-group-item">{value}</li>
                                })}
                            </ul>
                        </div>
                        <div className="div2-test">
                            <h4>Base-files</h4>
                            <ul className="list-group">
                                {test.baseFiles.map((value: any, index: number) => {
                                    return <li key={index} className="list-group-item">{value}</li>
                                })}
                            </ul>
                        </div>
                        <div className="div3-test">
                            <h4 style={{ marginBottom: '5%' }}>Results</h4>

                            {results.length > 0 && (
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
                                            return (<tr key={index}>
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
                            ) || (<h5 style={{ color: `rgb(0, 190, 100)` }}>No similarities found!</h5>)}


                        </div>
                    </div>

                    {results.length > 0 &&

                        <div className="graph-container">
                            <CytoscapeComponent elements={elements} zoomingEnabled={false}
                                style={{
                                    width: window.innerWidth / 2, height: window.innerHeight / 2,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'block',
                                }} layout={{ name: 'circle' }} />
                        </div>
                    }

                </div>
            }
        </div>
    )
}