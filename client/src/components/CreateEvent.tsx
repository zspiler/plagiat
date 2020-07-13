import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';

import { ProgressBar } from 'react-bootstrap'
import Navbar from './layout/Navbar'

export default function CreateEvent(): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })
    const [formData, setFormData] = useState({ title: '', description: '', });

    const getUser = async () => {
        try {
            const user = await axios.get('http://localhost:5000/api/auth/user');
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
        if (files.length + baseFiles.length == 0) { console.log('No files selected!'); return }
        uploadFiles();
    };

    const onChange = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addFile = (e: any) => { // TODO: fix type
        // setProgess(0)
        const file = e.target.files[0]; // accesing file
        setFiles([...files, file]); // storing file
    }

    const addBaseFile = (e: any) => { // TODO: fix type
        // setProgess(0)
        const file = e.target.files[0]; // accesing file
        setBaseFiles([...baseFiles, file]); // storing file
    }

    const { title, description } = formData;

    const [files, setFiles] = useState([] as any)
    const [baseFiles, setBaseFiles] = useState([] as any)

    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgess] = useState(0); // progess bar

    const el = React.useRef<HTMLInputElement>(null);

    const uploadFiles = () => {
        const formData = new FormData();

        let i = 0
        baseFiles.forEach((f: string | Blob) => {
            formData.append(`basefile ${i}`, f);
            i += 1
        });

        i = 0
        files.forEach((f: string | Blob) => {
            formData.append(`file ${i}`, f);
            i += 1
        });

        axios.post('http://localhost:5000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                var pct = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setProgess(pct);
            }

        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    }

    const languages = [
        'c',
        'cc',
        'java',
        'ml',
        'pascal',
        'ada',
        'lisp',
        'scheme',
        'haskell',
        'fortran',
        'ascii',
        'vhdl',
        'verilog',
        'perl',
        'matlab',
        'python',
        'mips',
        'prolog',
        'spice',
        'vb',
        'csharp',
        'modula2',
        'a8086',
        'javascript',
        'plsql',
    ];

    if (auth.loaded && !auth.username) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Navbar />
            <div className="center-container">
                <h4>Create new event</h4>
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
                        <select className="form-control" id="exampleFormControlSelect1">
                            {languages.map((value: string, index: number) => {
                                return <option key={index}>{value}</option>
                            })}
                        </select>
                    </div>

                    <div className="center-container">
                        <label className="btn btn-outline-info">
                            Add file <input type="file" ref={el} onChange={addFile} hidden />
                        </label>

                        <label className="btn btn-outline-info">
                            Add base-file <input type="file" ref={el} onChange={addBaseFile} hidden />
                        </label>

                        <button type="submit" className="btn btn-outline-danger">
                            Submit
                        </button>

                        {files.length > 0 &&
                            <div>
                                <h4>selected files</h4>

                                <ul className="list-group">
                                    {files.map((value: any, index: number) => {
                                        return <li key={index}>{value.name}</li>
                                    })}
                                </ul>
                            </div>
                        }

                        {baseFiles.length > 0 &&
                            <div>
                                <h4>selected base-files</h4>
                                <ul className="list-group">
                                    {baseFiles.map((value: any, index: number) => {
                                        return <li key={index}>{value.name}</li>
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </form>

            </div>

            <p>{auth.username}</p>

            <div>
                <div className="file-upload">

                    {/* <ProgressBar variant="danger" now={progress} /> */}
                </div>
            </div>

        </div>

    )
}


// 1. choose files and base files 2. print out files and base files 3. submit form & upload files
// before submitting check if any files have been added..