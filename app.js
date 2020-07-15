const express = require('express');
const session = require('express-session');

const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const configurePassport = require('./utils/configurePassport');

// Connect to database
require('./utils/db')();

const app = express();
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Auth 
app.use(
    cors({ origin: 'http://localhost:3000', credentials: true, })
);
app.use(
    session({ secret: 'secret..', resave: true, saveUninitialized: true, })
);
app.use(cookieParser('secret..'));
app.use(express.json({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport)

// File upload 
app.use(fileUpload());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/upload', require('./api/upload'));
app.use('/api/events', require('./api/events'));

