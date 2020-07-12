const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// GET api/auth/user
// Get user

router.get('/user', async (req, res) => {
    if (req.user) res.send(req.user.username)
    else res.status(401).json('Unauthorized');
});

// POST api/auth/register
// Register user

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    User.findOne({ username: username }, async (err, doc) => {
        if (err) console.log(err);
        if (doc) res.send('User exists!');
        // handle error etc etc
        else {
            const user = new User({
                username,
                password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
            });
            await user.save();
            res.send('User saved to DB');
        }
    });
});

// POST api/auth/login
// Login

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send('No User Exists');
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send('Successfully Authenticated');
                console.log(`${req.user.username} logged in.`);
            });
        }
    })(req, res, next);
});

// GET api/auth/logout
// Logout

router.get('/logout', function (req, res) {
    req.logout();
    // res.redirect('/');
    res.send('Logged out')
});

module.exports = router;
