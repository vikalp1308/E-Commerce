var express = require('express');
var app = express();
var home = require('./routes/home');
var users = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup')

global.pool = require('./database/connection')

app.use('/', home);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);
module.exports = app;




