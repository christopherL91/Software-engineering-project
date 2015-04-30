(function() {
	'use strict';

	angular
		.module('portfolioApp.AuthService',['ngStorage'])
		.factory('AuthService', AuthService);

		AuthService.$inject = ['$http','$localStorage','$q','jwtHelper','streamService','SERVER_INFO'];

		function AuthService($http,$localStorage,$q,jwtHelper,streamService,SERVER_INFO) {
			return {
				login: function(user) {
					var deferred = $q.defer();
					$http.get(SERVER_INFO.address)
						.then(function(response) {
							$localStorage.token = response.data.token;
							streamService.open();
							deferred.resolve(response);
						})
						.catch(function(error) {
							deferred.reject(error)
						});
					return deferred.promise;
				},
				logout: function() {
					return $q(function(resolve) {
						delete $localStorage.token;
						streamService.close();
						resolve();
					});
				},
				forgot: function(user) {
					var deferred = $q.defer();
					$http({
							url:SERVER_INFO.address + '/api/auth/forgot_password',
							params: {
								email:user.email,
								platform:'web'
							}
						})
						.then(function(response) {
							deferred.resolve(response);
						})
						.catch(function(error) {
							deferred.reject(error);
						});
					return deferred.promise;
				},
				isAuthenticated: function() {
					var authenticated = false;
					var token = $localStorage.token;
					if(token) {
						authenticated = !(window.isEmpty(token) && jwtHelper.isTokenExpired(token));
						streamService.open();
					}
					return authenticated;
				}
			};
		}
})();