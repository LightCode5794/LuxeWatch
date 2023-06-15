require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const db = require('./config/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');
const methodOverride = require('method-override');
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
const NumeralHelper = require("handlebars.numeral");


require("./config/passport");
require("./config/google")

const app = express();
const port = 3000;

// config cookie
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
MomentHandler.registerHelpers(Handlebars);
NumeralHelper.registerHelpers(Handlebars);
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        // Specify helpers which are only registered on this instance.
        helpers: {
            sum: (a, b) => a + b,
            multiply: (a, b) => a * b,
            json: function (obj) {
                return JSON.stringify(obj);
            }
        },
    }),
);

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
app.use(methodOverride('_method')); // override method of form request

//cấu hình đọc file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// parse form-data
//app.use(multer().any());

//routes init

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
