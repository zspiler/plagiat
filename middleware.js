const bcrypt = require('bcryptjs');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(function (username, password, done) {
            User.findOne({ username }, function (err, user) {
                if (err) {
                    throw err;
                }
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result) return done(null, user);
                    else return done(null, false);
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                username: user.username,
            };
            done(err, userInformation);
        });
    });
};
