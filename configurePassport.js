const bcrypt = require('bcryptjs');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;

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

    passport.use(
        new BasicStrategy(function (username, password, done) {
            console.log(`BASIC STRATEGY username: ${username}, password: ${password}`);
            User.findOne({ username }, function (err, user) {
                if (err) {
                    return done(null, false); // TODO: 
                }
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result) return done(null, user);
                    else return done(null, false);
                });
            });


            // User.findOne({ username: username }, function (err, user) {
            //     if (err) { return done(err); }
            //     if (!user) { return done(null, false); }
            //     if (!isValidPassword(user, password)) { return done(null, false); }
            //     return done(null, user);
            // });

            // var isValidPassword = function (employer, password) {
            //     return bCrypt.compareSync(password, employer.password);
            // }
        }));

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
