const express = require('express');
const session = require('express-session');

const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const middleware = require('./middleware');

require('./db')(); // connect to database

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(
    session({
        secret: 'secret..',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser('secret..'));
app.use(express.json({ extended: false }));

// Configure Middleware
app.use(passport.initialize());
app.use(passport.session());
middleware(passport);

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', require('./api/auth'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
