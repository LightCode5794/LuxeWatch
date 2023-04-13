require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const db = require('./config/db');
const routes = require('./routes');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const flash = require("express-flash");

// require("./config/passport"); 
// require("./config/google")

const app = express();
const port = 3000;


app.use(cookieParser());
app.use(
    session({
        secret: 'secr3t',
        resave: false,
        saveUninitialized: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    }),
);
app.use(flash());

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

//cấu hình đọc file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

//routes init

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
