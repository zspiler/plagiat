const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const fs = require('fs-extra')
const MossClient = require('moss-node-client')
const parseResult = require('../utils/parseResult');


const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else return res.status(401).send('Unauthorized');
}


// GET api/tests
// Get logged-in user's tests

router.get('/', authenticate, async (req, res) => {
    User.findOne({ username: req.user.username }, async (err, user) => {
        if (err) console.log(err);
        if (user) {
            var tests = await Test.find().where('_id').in(user.tests).exec();
            res.send(tests)
        }
    })
})


// GET api/tests/:testID
// Get a test 

router.get('/:testID', authenticate, async (req, res) => {
    const testID = req.params.testID
    const user = await User.findOne({ username: req.user.username })
    if (!user.tests.includes(testID)) res.status(403).send('Unauthorized Access');

    const test = await Test.findById(testID).exec()
    res.send(test)
})


// DELETE api/tests/:testID
// Delete a test 

router.delete('/:testID', authenticate, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    if (!user.tests.includes(req.params.testID)) res.status(403).send('Unauthorized Access');

    Test.deleteOne({ _id: req.params.testID }, (err) => {
        if (err) res.status(500).send('Server Error')
        else res.send('Deleted test')
    });
})


// POST api/tests
// Create new test

router.post('/', authenticate, async (req, res) => {

    console.log(`/api/tests `);
    const test = new Test(JSON.parse(req.body.form))

    // Add test to user
    User.findOne({ username: req.user.username }, async (err, user) => {
        if (err) {
            res.status(500).send('Server Error')
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

    // Move files to dirs
    for (var key in req.files) {
        const file = req.files[key]
        var dir = (key.indexOf('base') === 0 ? baseFilesDir : filesDir)
        await file.mv(`${dir}/${file.name}`);
    }

    const moss = new MossClient(JSON.parse(req.body.form).language, "113025430")

    fs.readdirSync(filesDir).forEach(function (file) {
        moss.addFile(`${filesDir}/${file}`, file)
    });

    fs.readdirSync(baseFilesDir).forEach(function (file) {
        moss.addFile(`${baseFilesDir}/${file}`, file)
    });

    // Submit files to Moss 
    moss.process().then(url => {
        const results = parseResult(url)

        results.forEach(pair => {
            test.results.push(pair)
        })
        test.save()

        res.send(test._id)
        // Remove created files
        fs.remove(`${testDir}`, () => {
            return
        })
    }).catch(err => {
        res.status(500).send('Server Error - Cannot connect to Moss servers.')
    })
});


module.exports = router;

