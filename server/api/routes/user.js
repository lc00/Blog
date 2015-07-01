var UserController = require('../controllers/user');
var passport = require('passport');

var userController = new UserController();

var userRoutes = function(app){
	app.post('/api/v1/user/signUp', userController.processSignUp);
	app.post('/api/v1/user/login', userController.processLogin);
	app.post('/api/v1/user/myProfile', passport.authenticate('bearer', {session: false}), userController.getMyProfile);
	app.post('/api/v1/user/logout', userController.processLogout);
	// app.post('api/v1/user/login', userController.login);
	// app.get('api/v1/user/:token', userController.getOne);
};

module.exports = userRoutes;