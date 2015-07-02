(function(){
	var myProfileController = function($scope, $http, $location){

		var retrieveUserObject = localStorage.getItem('currentUser');

		var currentUser = JSON.parse(retrieveUserObject);
		console.log(currentUser.token);
		console.log(currentUser.tokenCreatedTime);

		if(currentUser.token && currentUser.tokenCreatedTime){
			$http
				.post('api/v1/user/myProfile', {
					access_token: currentUser.token
				})
				.success(function(data, status){
					console.log(data);
				})
				.error(function(data, status){
					console.log(data);
					$location.path('/login');
				});
		}

		else $location.path('/login');

		$scope.username = currentUser.username;


	};

	myProfileController.$inject = ['$scope', '$http', '$location'];

	angular
		.module('blog')
		.controller('myProfileController', myProfileController);

}());