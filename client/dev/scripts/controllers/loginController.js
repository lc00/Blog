(function(){
	var loginController = function($rootScope, $scope, $http, $location, $state){

		$rootScope.loggedin = false;
		
	  window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '811000689006799',
	      xfbml      : true,
	      version    : 'v2.3'
	    });
	  };

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));


		$scope.login = function(user){
			$http
				.post('/api/v1/user/login', user)
				.success(function(data, status){
					$scope.status = data;
					$rootScope.loggedin = true;

					var currentUser = JSON.stringify(data);

					localStorage.setItem('currentUser', currentUser);

					$state.go('myProfile');

				})
				.error(function(data, status){
					$scope.status = data;
				});
		};

		$scope.logout = function(){
			$http
				.post('api/v1/user/logout', token)
				.success(function(data, status){
					
					console.log(data);

					$rootScope.loggedin = false;

					localStorage.clear();
				})
				.error(function(data, status){
					console.log(data);
					$scope.status = data;
				});
		};

		$scope.facebookLogin = function () {
			$http
				.get('/auth/facebook')
				.success(function (data) {
					console.log(data);
				});
		};
	};

	loginController.$inject = ['$rootScope','$scope', '$http', '$location', '$state'];

	angular
		.module('blog')
		.controller('loginController', loginController);

}());
