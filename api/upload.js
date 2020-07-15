const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs-extra')
const MossClient = require('moss-node-client')
const parseResult = require('../utils/parseResult')

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }
}

// POST api/upload/:eventId
// Upload files, submit to Moss, send back parsed results

router.post('/:eventID', authenticate, async (req, res) => {

    const files = req.files;
    if (!files) return res.status(500).send({ msg: "Files not found" })

    const eventDir = `${__dirname.split('/').slice(0, -1).join('/')}/uploads/${req.params.eventID}`
    const filesDir = `${eventDir}/files`
    const baseFilesDir = `${eventDir}/basefiles`

    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });
    if (!fs.existsSync(baseFilesDir)) fs.mkdirSync(baseFilesDir, { recursive: true });

    for (var key in req.files) {
        const file = req.files[key]
        var dir = (key.indexOf('base') == 0 ? baseFilesDir : filesDir)
        await file.mv(`${dir}/${file.name}`);
    }

    const moss = new MossClient('python', "113025430") // TODO: pass lang        

    fs.readdirSync(filesDir).forEach(function (file) {
        moss.addFile(`${filesDir}/${file}`, file)
    });

    fs.readdirSync(baseFilesDir).forEach(function (file) {
        moss.addFile(`${baseFilesDir}/${file}`, file)
    });

    moss.process().then(url => {
        res.send(parseResult(url))
        fs.remove(`${root}/uploads/${req.params.eventID}`, () => {
            console.log(`Deleted ${req.params.eventID}`);
            return
        })
    })

});




module.exports = router;