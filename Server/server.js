var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var routes = require('./routes');

var app = express();
var port = process.env.PORT || 5000;
var server = app.listen(5000);
console.log('Listening to port ' + port)
io = socket.listen(server);
exports.io = io;

// config files
//var db = require('./config/db');
var db = process.env.DB || 'mongodb://localhost:27017/carent';

// connect to our mongoDB database
mongoose.connect(db);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../Client/public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/',express.static(path.join(__dirname, '../Client')));
routes(app);

// socket io define
io.on('connection', function (client) {
    console.log('Client connected..');
    client.on('newScreen', function (data) {

    });

    client.on('disconnect', function (data) {
        console.log("disconnect + " + data);
    });
});




// route to handle creating goes here (app.post)
// route to handle delete goes here (app.delete)

// frontend routes =========================================================


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//  app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//      message: err.message,
//      error: err
//    });
//  });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.status('error').json({
//    message: err.message,
//    error: {}
//  });
//});

//module.exports = app;
