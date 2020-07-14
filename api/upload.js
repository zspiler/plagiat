const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs')
const Moss = require('../moss.js')

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }
}

// POST api/upload 
// Upload files 

// POST api/upload/:eventId
// Create directory and upload 

router.post('/:eventID', authenticate, async (req, res) => {

    const files = req.files;
    if (!files) return res.status(500).send({ msg: "Files not found" })

    const root = __dirname.split('/').slice(0, -1).join('/')
    const filesDir = `${root}/uploads/${req.params.eventID}/files`
    const baseFilesDir = `${root}/uploads/${req.params.eventID}/basefiles`
    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });
    if (!fs.existsSync(baseFilesDir)) fs.mkdirSync(baseFilesDir, { recursive: true });

    for (var key in req.files) {
        const file = req.files[key]
        var dir = (key.indexOf('base') == 0 ? baseFilesDir : filesDir)
        await file.mv(`${dir}/${file.name}`);
    }

    moss = new Moss(113025430, 'python');

    fs.readdirSync(filesDir).forEach(function (file) {
        moss.addFile(`${filesDir}/${file}`);
    });

    fs.readdirSync(baseFilesDir).forEach(function (file) {
        moss.addBaseFile(`${filesDir}/${file}`);
    });

    // ASYNC

    // fs.readdir(filesDir + '/', function (err, files) {
    //     if (err) {
    //         console.log('Unable to scan directory');
    //         return
    //     }
    //     files.forEach(function (file) {
    //         let path = `${filesDir}/${file}`
    //         moss.addFile(path);
    //     });
    // });

    // // add base-files
    // fs.readdir(baseFilesDir, function (err, files) {
    //     if (err) {
    //         console.log('Unable to scan directory');
    //         return
    //     }
    //     files.forEach(function (file) {
    //         let path = `${baseFilesDir}/${file}`
    //         moss.addBaseFile(path);
    //     });
    // });

    url = moss.submit();
    return res.send(moss.parseResult(url))
});


module.exports = router;