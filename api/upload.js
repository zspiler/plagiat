const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }
}

// POST api/upload 
// Upload files 

router.post('/', authenticate, async (req, res) => {
    const files = req.files; //obj obj
    if (!files) return res.status(500).send({ msg: "Files not found" })

    const root = __dirname.split('/').slice(0, -1).join('/')

    for (var key in req.files) {
        const file = req.files[key]

        var path = `${root}/uploads/username/eventid/files/${file.name}`
        if (key.indexOf('base') == 0) path = `${root}/uploads/username/eventid/basefiles/${file.name}`

        file.mv(path, function (err) {
            // file.mv(`${root}/uploads/${req.user.username}/${myFile.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            console.log(`Uploaded ${file.name}!`);
        });

    }
    return res.send('Succcess')
});


module.exports = router;

// 1. choose files and base files 2. print out files and base files 3. submit form & upload files
// before submitting check if any files have been added..