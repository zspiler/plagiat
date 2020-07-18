import React, { useState, useEffect, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap'

import Navbar from './layout/Navbar'

import axios from 'axios'


export default function CreateEvent(): ReactElement {
    const [auth, setAuth] = useState({ username: "", loaded: false })
    const [formData, setFormData] = useState({ title: '', description: '', language: 'c', date: new Date().toLocaleDateString(), files: [] as any, baseFiles: [] as any });

    const [processing, setProcessing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgess] = useState(0);

    const [error, setError] = useState("")

    const [files, setFiles] = useState([] as any)
    const [baseFiles, setBaseFiles] = useState([] as any)
    const [testID, setTestID] = useState("")

    const { title, description, language } = formData;
    const el = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        getUser();
    }, []);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        if (uploading || processing) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getUser = async () => {
        try {
            const user = await axios.get('http://localhost:5000/api/auth/user');
            setAuth({ username: user.data.username, loaded: true })
        } catch (_) {
            setAuth({ username: "", loaded: true })
        }
    };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (uploading || processing) return;

        if (files.length < 2) return setError('Please select at least 2 files to compare');

        // Add files

        for (const file of files) {
            formData.files.push(file.name)
        }

        const fd = new FormData();

        formData.files = files.map((file: any) => file.name)
        formData.baseFiles = baseFiles.map((file: any) => file.name)

        fd.append('form', JSON.stringify(formData))

        for (let i = 0; i < baseFiles.length; i++) {
            fd.append(`basefile ${i}`, baseFiles[i]);
        }
        for (let i = 0; i < files.length; i++) {
            fd.append(`file ${i}`, files[i]);
        }

        // Upload files

        setUploading(true)
        let res = await axios.post(`http://localhost:5000/api/tests/`, fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                var pct = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                if (pct === 100) {
                    setUploading(false)
                    setProcessing(true)
                }
                setProgess(pct);

            }
        })
        setTestID(res.data)
    };


    const addFiles = (e: any) => {
        let arr: File[] = []
        for (var i = 0; i < e.target.files.length; i++) {
            for (const file of files) {
                if (file.name === e.target.files[i].name) {
                    return console.log('Please make sure all uploaded files have unique names.');
                }
            }
            arr.push(e.target.files[i])
        }
        setFiles(files.concat(arr))
    }

    const addBaseFiles = (e: any) => {
        let arr: File[] = []
        for (var i = 0; i < e.target.files.length; i++) {
            arr.push(e.target.files[i])
        }
        setBaseFiles(baseFiles.concat(arr))
    }

    if (auth.loaded && !auth.username) return <Redirect to="/" />;
    if (testID !== "") return <Redirect to={`/tests/${testID}`} />

    return (
        <div>

            <Navbar username={auth.username} />

            <div className="parent">
                <div className="div1">
                    <h2>Create test</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Language</label>
                            <select className="form-control" name="language" value={language} onChange={(e) => onChange(e)}>
                                <option value="c">c</option>
                                <option value="cc">cc</option>
                                <option value="java">java</option>
                                <option value="ml">ml</option>
                                <option value="pascal">pascal</option>
                                <option value="ada">ada</option>
                                <option value="lisp">lisp</option>
                                <option value="scheme">scheme</option>
                                <option value="haskell">haskell</option>
                                <option value="fortran">fortran</option>
                                <option value="ascii">ascii</option>
                                <option value="vhdl">vhdl</option>
                                <option value="verilog">verilog</option>
                                <option value="perl">perl</option>
                                <option value="matlab">matlab</option>
                                <option value="python">python</option>
                                <option value="mips">mips</option>
                                <option value="prolog">prolog</option>
                                <option value="spice">spice</option>
                                <option value="vb">vb</option>
                                <option value="csharp">csharp</option>
                                <option value="modula2">modula2</option>
                                <option value="a8086">a8086</option>
                                <option value="javascript">javascript</option>
                                <option value="plsql">plsql</option>
                            </select>
                        </div>

                        <div className={`button-labels` + (uploading || processing ? ` fadeOut` : ``)} >
                            <label className={`btn btn-outline-info`}>
                                Add files <input type="file" ref={el} onChange={addFiles} hidden multiple />
                            </label>

                            <label className={`btn btn-outline-info`}>
                                Add base-files <input type="file" ref={el} onChange={addBaseFiles} hidden multiple />
                            </label>

                            <label className={`btn btn-outline-danger`}>
                                Submit <input type="submit" hidden />
                            </label>

                            {error !== "" && <div className="error-text"> {error} </div>}

                        </div>

                    </form>
                </div>

                <div className="div2">
                    <div className="files">
                        {files.length + baseFiles.length > 0 &&
                            <div className={(uploading || processing ? `fadeOut` : ``)}>
                                <h5>selected files</h5>
                                <ul className="list-group">
                                    {files.map((value: any, index: number) => {
                                        return <li key={index} className="list-group-item">{value.name}</li>
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>

                <div className="div3">
                    <div className="base-files">
                        {files.length + baseFiles.length > 0 &&
                            <div className={(uploading || processing ? `fadeOut` : ``)}>
                                <h5>selected base-files</h5>
                                <ul className="list-group">
                                    {baseFiles.map((value: any, index: number) => {
                                        return <li key={index} className="list-group-item">{value.name}</li>
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>

                {uploading &&
                    <div className="div4">
                        <h5>uploading files...</h5>
                        <ProgressBar variant="info" now={progress} />
                    </div>
                }
                {processing &&
                    <div className="div4">
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
