(function(){
	var logoutController = function($rootScope, $scope, $http, $location){

		$rootScope.loggedin = true;

		$scope.logout = function(){
			$http
				.post('api/v1/user/logout', token)
				.success(function(data, status){
					
					console.log('in the success function of logout');

					$rootScope.loggedin = false;

					localStorage.clear();
				})
				.error(function(data, status){
					console.log('in the error function of logout');
					$scope.status = data;
				});
		};
	};

	logoutController.$inject = ['$rootScope', '$scope', '$http', '$location'];

	angular
		.module('blog')
		.controller('logoutController', logoutController);

}());
