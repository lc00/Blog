var User = require('../models/user');
var passport = require('passport');

var UserController = function(){};

UserController.prototype.processSignUp = function(req, res, next){
	// create a user document by instantiating a new instance of User model
	var user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password

	});

	user.save(function(err, user){
		if(err) {
			var errorMessage = 'An error occured, please try agaain';
			if(err.code === 11000){
				errorMessage = 'This user already exists.';	
			}
			return res.send(errorMessage);
		}
		res.send(user);
	});
};

UserController.prototype.processLogin = function(req, res, next){
	var authFunction = passport.authenticate('local', function(err, user, info){
		if(err) return next(err);
		//400 Bad Request
		//The server cannot or will not process the request due to something that is perceived 
		//to be a client error (e.g., malformed request syntax, invalid request message framing, 
		//or deceptive request routing)
		if(!user) return res.status(400).send('Incorrect username or password');

		// 200 OK
		// Standard response for successful HTTP requests. The actual response will depend on the 
		// request method used. In a GET request, the response will contain an entity corresponding to the 
		// requested resource. In a POST request, the response will contain an entity describing or containing 
		// the result of the action.
		res.status(200).send({
			username: user.username,
			token:		user.token,
			tokenCreatedTime: user.tokenCreatedTime
		});
	});
	authFunction(req, res, next);
};

UserController.prototype.getMyProfile = function(req, res, next){
	
	res.send('token works');
};

UserController.prototype.processLogout = function(req, res, next){
	res.send('user is logged out');

};

module.exports = UserController;