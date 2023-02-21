var express = require('express');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path')
global.pool = require('./database/connection')
var cors = require('cors'); //share resources with different domain

var products = require('./routes/products');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup')

global.pool = require('./database/connection')

app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/products', products);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);

module.exports = app;




