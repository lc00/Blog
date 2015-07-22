var User = require('../models/user');
var passport = require('passport');
var jwt = require('jwt-simple');
var secret = 'jqwe890dsghdfgsljklsd89jkert';

var UserController = function(){};

UserController.prototype.signUp = function(req, res, next){

	// User.remove(function(err){
	// 	if(err) return console.log('unable to wipe out users for a clean slate; ' + err);
	// 	console.log('successfully wiped out users for a clean slate');
	// });

	// create a user document by instantiating a new instance of User model
	var user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		token: jwt.encode({payload: new Date()}, secret),
		tokenCreatedTime: new Date().getTime()

	});

	user.save(function(err, user){
		if(err) {
			var errorMessage = 'An error occured, please try agaain';
			if(err.code === 11000){
				errorMessage = 'This user already exists.';	
			}
			console.log(err);
			return res.send(errorMessage);
		}
		res.status(201).send(user);
	});
};

UserController.prototype.login = function(req, res, next){
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
		res.send({
			username: user.username,
			token:		user.token,
			tokenCreatedTime: user.tokenCreatedTime
		});
	});
	
	authFunction(req, res, next);
};

// UserController.prototype.facebookLogin = function(req, res, next){
// 	console.log('FB works');
// 	res.send('facebook login works');
// };

UserController.prototype.getMyProfile = function(req, res, next){
	
	res.send('token works');
};

// UserController.prototype.logout = function(req, res, next){
// 	req.body.

// };

module.exports = UserController;