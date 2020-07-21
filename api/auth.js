const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


// GET api/auth/user
// Get user

router.get('/user', async (req, res) => {
    if (req.user) res.json(req.user)
    else res.status(401).send('Unauthorized');
});



// POST api/auth/register
// Register user

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validate form
    if (password.length < 6) {
        return res.status(400).send("Password must be at least 6 characters long")
    }

    User.findOne({ username: username }, async (err, doc) => {
        if (err) res.status(500).send('Server error.');
        if (doc) res.status(401).send('Username already taken.');
        else {
            const user = new User({
                username,
                password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
                events: []
            });
            await user.save();

            req.logIn(user, (err) => {
                if (err) {
                    return res.status(401).send('Error logging in.');
                }
                res.json(user)
            });
        }
    });
});

// POST api/auth/login
// Log In

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', (err, user, _) => {
        if (err) res.status(401).send('Unauthorized');
        if (!user) res.status(401).send('User does not exist');
        else {
            req.logIn(user, (err) => {
                if (err) res.status(401).send('Error logging in');;
                res.send(`${req.user.username} logged in`);
            });
        }
    })(req, res, next);
});

// GET api/auth/logout
// Log Out

router.get('/logout', function (req, res) {
    req.logout();
    res.send('Logged out')
});

module.exports = router;
