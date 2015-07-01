(function(){
	var createUserController = function($scope, $http){
		$scope.signUp = function(user){
			$http
				.post('/api/v1/user/signUp', {
					username: user.username,
					email: user.email,
					password: user.password
				})
				.success(function(data, status){
					$scope.status = 'User Created';
				})
				.error(function(data, status){
					$scope.status = data;
				})
		};
	};

	createUserController.$inject = ['$scope', '$http'];

	angular
		.module('blog')
		.controller('createUserController', createUserController);

}());
