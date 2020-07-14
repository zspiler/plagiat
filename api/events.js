const express = require('express');
const router = express.Router();
const passport = require('passport')
const Event = require('../models/Event');

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }
}

// POST api/events
// Create new event

router.post('/', async (req, res) => {
    const { title, description, language } = req.body
    const event = new Event({ title: title, description: description, language: language })

    User.findOne({ username: req.user.username }, async (err, doc) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            // doc.events.unshift(event._id);
            doc.events.push(event._id)
            doc.save()
        }
    });
    res.send(event._id)
});


module.exports = router;

