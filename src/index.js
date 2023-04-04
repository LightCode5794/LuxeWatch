require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const routers = require('./routes');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const db = require('./config/db');
const routes = require('./routes');

const passport = require('passport');
require('./config/google');

const app = express();
const port = 3000;

app.use(
    session({
        secret: 'secr3t',
        resave: false,
        saveUninitialized: true,
    }),
);

//conect to db
db.connect();

// template engine
app.engine('hbs', engine({ extname: '.hbs' }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// HTTP logger
app.use(morgan('combined'));

//Middleware
app.use(
    express.urlencoded({
        // Xử lý post dữ liệu từ form
        extended: true,
    }),
);
app.use(express.json()); // Xử lý post dữ liệu từ các thằng như XMLHttpRequest, fetch, axios,

app.use(passport.initialize());
app.use(passport.session());

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/profile',
        failureFlash: true,
        successFlash: 'Successfully logged in!',
    }),
);

app.use(express.static(path.join(__dirname, 'public')));
//routes init
//routes(app);
// app.get('/', (req, res) => {
//   res.render('admin/dashboard', {layout: 'admin'});

// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
