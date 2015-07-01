var User = require('../models/user');
var passport = require('passport');

var UserController = function(){};

var performLogin = function(req, res, next, user){
	req.login(user, function(err){
		if(err) return next(err);

		return res.redirect('/myProfile');
	})
};

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

		// performLogin(req, res, next, user); 

		res.send(user);
	});
};

UserController.prototype.processLogin = function(req, res, next){
	var authFunction = passport.authenticate('local', function(err, user, info){
		if(err) return next(err);
		if(!user) return res.status(400).send('Incorrect username or password');

		// performLogin(req, res, next, user);

		res.send({
			username: user.username,
			token:		user.token,
			tokenCreatedTime: user.tokenCreatedTime
		});
	});
	authFunction(req, res, next);
};

UserController.prototype.getMyProfile = function(req, res, next){
	
	res.send('token works')
};

UserController.prototype.processLogout = function(req, res, next){
	res.send('user is logged out');

};

module.exports = UserController;