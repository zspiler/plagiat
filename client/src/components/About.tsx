import React, { ReactElement, useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import Navbar from './layout/Navbar'

import axios from 'axios'

export default function About(): ReactElement {

    const [auth, setAuth] = useState({ username: "", loaded: false })

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        try {
            const user = await axios.get('http://localhost:5000/api/auth/user');
            setAuth({ username: user.data.username, loaded: true })
        }
        catch (error) {
            console.log(error);
            setAuth({ username: "", loaded: true })
        }
    };

    if (auth.loaded && !auth.username) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Navbar username={auth.username} />

            <div className="about-container">
                <h4>What is Moss?</h4>

                <p>"Moss (for a Measure Of Software Similarity) is an automatic system for determining the
                similarity of programs. To date, the main application of Moss has been in detecting
                plagiarism in programming classes. Since its development in 1994, Moss has been very
                effective in this role. The algorithm behind moss is a significant improvement over other
                cheating detection algorithms (at least, over those known to us)."</p>


                <h4>What is Moss not?</h4>

                <p>"Moss is not a system for completely automatically detecting plagiarism.
                Plagiarism is a statement that someone copied code deliberately without attribution,
                and while Moss automatically detects program similarity, it has no way of knowing why
                codes are similar. It is still up to a human to go and look at the parts of the code that
                Moss highlights and make a decision about whether there is plagiarism or not. One way of
                thinking about what Moss provides is that it saves teachers and teaching staff a lot of
                time by pointing out the parts of programs that are worth a more detailed examination.
                But once someone has looked at those portions of the programs, it shouldn't matter whether
                the suspect code was first discovered by Moss or by a human; the case that there was
                plagiarism should stand on its own. In particular, it is a misuse of Moss to rely
                solely on the similarity scores. These scores are useful for judging the relative amount
                of matching between different pairs of programs and for more easily seeing which pairs of
                programs stick out with unusual amounts of matching. But the scores are certainly not a
                proof of plagiarism. Someone must still look at the code."</p>

                <p>Read more at: https://theory.stanford.edu/~aiken/moss/</p>

                <h4>Getting started</h4>

                <p> Get started by <Link to="/new-test">creating a new test</Link> and uploading some files you'd like to check. You can also supply 'base-files',
                which contain code that will not be counted when checking for similarities.
                When adding files, please make sure they all have unique names.</p>

                <h4>Reading the results</h4>
                <p>From the official description:</p>
                <p> "Lines Matched is approximately the number of lines of code that matched. Each file is also
                given a percentage score, which is the the percentage of the code in one file considered to
                    match code in the other file. For both measures, higher numbers mean more code matches."</p>

            </div>

        </div>
    )
}
