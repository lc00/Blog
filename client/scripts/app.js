(function(){
	var app = angular.module('blog', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('signUp', {
				url: '/',
				controller: 'createUserController',
				templateUrl: '../views/createUser.html'
			})
			.state('login', {
				url: '/',
				controller: 'loginController',
				templateUrl: '../views/login.html'
			})
			.state('myProfile', {
				url: '/myProfile',
				controller: 'myProfileController',
				templateUrl: '../views/myProfile.html'
			})
	});


}());