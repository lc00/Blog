var UserController = require('../controllers/user');
var passport = require('passport');

var userController = new UserController();

var userRoutes = function(app){
	app.post('/api/v1/users', userController.signUp);
	app.post('/api/v1/users/login', userController.login);
	// app.post('/api/v1/users/logout', userController.logout);
	
	// app.get('api/v1/users/:token', userController.getOne);


	// app.get('/auth/facebook', passport.authenticate('facebook'));
	// app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
 //  userController.facebookLogin);
};

module.exports = userRoutes;