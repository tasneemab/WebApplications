var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/index');

var app = express();

const session = require ('express-session');
const Sequelize = require('sequelize');
const config = require(__dirname + '/config/config.json')["development"]; //database configuartion

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const myStore = new SequelizeStore({
    db: new Sequelize(config)
});
myStore.sync() //sync database

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'github search',
    store: myStore,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000 }
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);

module.exports = app;
