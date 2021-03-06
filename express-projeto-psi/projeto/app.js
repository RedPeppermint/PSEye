var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');
const expressJwt = require('express-jwt');
const shared_secret = require('./sharedSecret').shared_secret;
var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(expressJwt({ secret: shared_secret, algorithms: ['HS256'] }).unless({ path: ['/users/login', '/users/register'] }));
app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// var mongoDB = 'mongodb+srv://admin:admin@heroes.p9t7b.mongodb.net/Projeto1?retryWrites=true&w=majority';
var mongoDB = "mongodb://psi017:psi017@localhost:27017/psi017?retryWrites=true&authSource=psi017";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).catch(function (err) {
    console.log(err);
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (db.collections.users === undefined) {
    db.createCollection("users").then(() => console.log("User Collection Created"));
}

if (db.collections.photos === undefined) {
    db.createCollection("photos").then(() => console.log("Photos Collection Created"));
}


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;