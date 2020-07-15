import React, { useState, useEffect, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap'

import Navbar from './layout/Navbar'

import axios from 'axios'


export default function CreateEvent(): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })
    const [formData, setFormData] = useState({ title: '', description: '', language: 'c' });
    const [processing, setProcessing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [files, setFiles] = useState([] as any)
    const [baseFiles, setBaseFiles] = useState([] as any)
    const [progress, setProgess] = useState(0);

    const { title, description, language } = formData;

    const el = React.useRef<HTMLInputElement>(null);

    const getUser = async () => {
        try {
            console.log(`getting user.`);
            const user = await axios.get('http://localhost:5000/api/auth/user');
            console.log(`got user: (username: ${user.data}) setting loaded to true`);
            setAuth({ username: user.data, loaded: true })
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

        if (files.length + baseFiles.length === 0) { console.log('No files selected!'); return }

        let eventID = (await axios.post('http://localhost:5000/api/events', formData)).data

        // Upload files

        const fd = new FormData();

        for (let i = 0; i < baseFiles.length; i++) {
            fd.append(`basefile ${i}`, baseFiles[i]);
        }
        for (let i = 0; i < files.length; i++) {
            fd.append(`file ${i}`, files[i]);
        }

        setUploading(true)
        let res = await axios.post(`http://localhost:5000/api/upload/${eventID}`, fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                var pct = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setProgess(pct);
            }
        })
        setUploading(false)

        console.log(`Moss response: ${JSON.stringify(res)}`);
    };

    const onChange = async (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> |
        React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addFiles = (e: any) => {
        let arr: File[] = []
        for (var i = 0; i < e.target.files.length; i++) {
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


    if (auth.loaded && !auth.username) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Navbar username={auth.username} />

            <div className="parent">
                <div className="div1">
                    <h2>Create event</h2>

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
                            <label className={`btn btn-outline-info` + (uploading || processing ? ` fadeOut` : ``)}>
                                Add files <input type="file" ref={el} onChange={addFiles} hidden multiple />
                            </label>

                            <label className={`btn btn-outline-info` + (uploading || processing ? ` fadeOut` : ``)}>
                                Add base-files <input type="file" ref={el} onChange={addBaseFiles} hidden multiple />
                            </label>

                            <label className={`btn btn-outline-danger` + (uploading || processing ? ` fadeOut` : ``)}>
                                Submit
                                <input type="submit" hidden />
                            </label>
                        </div>

                    </form>
                </div>
                <div className="div2">
                    <div className="files">
                        {files.length + baseFiles.length > 0 &&
                            <div>
                                <h5>selected files</h5>
                                <ul className="list-group">
                                    {files.map((value: any, index: number) => {
                                        return <li key={index}>{value.name}</li>
                                    })}
                                </ul>
                            </div>
                        }

                    </div>
                </div>
                <div className="div3">
                    <div className="base-files">
                        {files.length + baseFiles.length > 0 &&
                            <div>
                                <h5>selected base-files</h5>
                                <ul className="list-group">
                                    {baseFiles.map((value: any, index: number) => {
                                        return <li key={index}>{value.name}</li>
                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>

                {/* states: uploading, processing */}

                {uploading &&
                    <div className="div4">
                        <h5>uploading files...</h5>
                        <ProgressBar variant="info" now={progress} />
                    </div>
                }
            </div>
        </div>
    )
}
