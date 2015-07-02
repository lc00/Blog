var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var webRoutes = require('./web/web');
var userRoutes = require('./api/routes/user');


var mongoose = require('mongoose');

require('./api/config/passport');	

mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/blog');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

userRoutes(app);
webRoutes(app);

// process is window(global object) for node
var port = process.env.PORT;

var server = app.listen(port, function(){
	console.log('this app is listening at http://localhost/' + port);
});