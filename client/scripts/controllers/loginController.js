(function(){
	var loginController = function($rootScope, $scope, $http, $location){

		$rootScope.loggedin = false;

		$scope.login = function(user){
			$http
				.post('/api/v1/user/login', user)
				.success(function(data, status){
					$scope.status = 'User logged in';
					$rootScope.loggedin = true;

					var currentUser = JSON.stringify(data);

					localStorage.setItem('currentUser', currentUser);

					//$location.path('/myProfile');

				})
				.error(function(data, status){
					$scope.status = data;
				})
		};

		$scope.logout = function(){
			$http
				.post('api/v1/user/logout', token)
				.success(function(data, status){
					
					console.log(data)

					$rootScope.loggedin = false;

					localStorage.clear();
				})
				.error(function(data, status){
					console.log(data)
					$scope.status = data;
				})
		}
	};

	loginController.$inject = ['$rootScope','$scope', '$http', '$location'];

	angular
		.module('blog')
		.controller('loginController', loginController);

}());
