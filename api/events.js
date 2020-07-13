const express = require('express');
const router = express.Router();
const passport = require('passport')

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }
}

// POST api/events
// Create new event

// router.post('/', authenticate, async (req, res) => {
//     console.log('/upload, authenticated!');
//     console.log(`req.files: ${req.files}`);

//     if (!req.files) {
//         return res.status(500).send({ msg: "File not found" })
//     }
//     const myFile = req.files.file;

//     const root = __dirname.split('/').slice(0, -1).join('/')
//     // myFile.mv(`${root}/uploads/${req.user.username}/${myFile.name}`, function (err) {
//     myFile.mv(`${root}/uploads/username/${myFile.name}`, function (err) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ msg: "Error occured" });
//         }
//         console.log('Upload successful!');
//         return res.send({ name: myFile.name, path: `/${myFile.name}` });
//     });
// });


module.exports = router;

// 1. choose files and base files 2. print out files and base files 3. submit form & upload files
// before submitting check if any files have been added..