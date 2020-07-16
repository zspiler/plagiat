const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
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

// GET api/tests
// Get logged-in user's tests

router.get('/', authenticate, async (req, res) => {
    const username = req.user.username
    console.log(`/tests, username: ${username}`);
    User.findOne({ username: username }, async (err, user) => {
        if (err) console.log(err);
        if (user) {
            var tests = await Test.find().where('_id').in(user.tests).exec();
            console.log(`sending ${tests}`);
            res.send(tests)
        }
    })
})


// GET api/tests/:testID
// Get a specific test (protected)

router.get('/:testID', authenticate, async (req, res) => {
    const testID = req.params.testID
    const user = await User.findOne({ username: req.user.username })

    if (!user.tests.includes(testID)) res.status(401).send('Unauthorized');

    const test = await Test.findById(testID).exec()
    res.send(test)
})


// POST api/tests
// Create new test

router.post('/', authenticate, async (req, res) => {
    const { title, description, language, date, files, baseFiles } = JSON.parse(req.body.form)

    // Create and save test
    const test = new Test({
        title: title, description: description, language: language, date: date,
        files: files, baseFiles: baseFiles
    })

    // Add test to user
    User.findOne({ username: req.user.username }, async (err, user) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            user.tests.push(test._id)
            user.save()
        }
    });

    const testDir = `${__dirname.split('/').slice(0, -1).join('/')}/uploads/${test._id}`
    const filesDir = `${testDir}/files`
    const baseFilesDir = `${testDir}/basefiles`

    // Create dirs
    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });
    if (!fs.existsSync(baseFilesDir)) fs.mkdirSync(baseFilesDir, { recursive: true });

    // Move files
    for (var key in req.files) {
        const file = req.files[key]
        var dir = (key.indexOf('base') == 0 ? baseFilesDir : filesDir)
        await file.mv(`${dir}/${file.name}`);
    }

    const moss = new MossClient(language, "113025430")

    fs.readdirSync(filesDir).forEach(function (file) {
        moss.addFile(`${filesDir}/${file}`, file)
    });

    fs.readdirSync(baseFilesDir).forEach(function (file) {
        moss.addFile(`${baseFilesDir}/${file}`, file)
    });

    // Submit to moss
    moss.process().then(url => {
        const results = parseResult(url)

        results.forEach(pair => {
            test.results.push(pair)
        })
        console.log(`test with results: ${JSON.stringify(test)}`);
        test.save()

        res.send('Success!')
        // Remove created files
        fs.remove(`${testDir}`, () => {
            return
        })
    })
});


module.exports = router;

