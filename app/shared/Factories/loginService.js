(function() {
	'use strict';

	angular
		.module('portfolioApp.AuthService',['ngStorage'])
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http','$interval','$localStorage','$q','jwtHelper','SERVER_INFO'];

	function AuthService($http,$interval,$localStorage,$q,jwtHelper,SERVER_INFO) {
		return {
			login: function(user) {
				var deferred = $q.defer();
				$http.post(SERVER_INFO.address + '/api/login',user)
					.then(function(response) {
						$localStorage.token = response.data.token;
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
					resolve();
				});
			},
			info: function() {
				return this.tokenPromise()
					.then(function() {
						return $http({
							method: 'GET',
							url : SERVER_INFO.address + '/api/info',
							data: '',
							headers: {
								'Content-Type': 'application/json; charset=utf-8'
							}
						});
					});
			},
			forgot: function(user) {
				var deferred = $q.defer();
				$http({
					url: SERVER_INFO.address + '/api/auth/forgot_password',
					params: {
						email: user.email,
						platform: 'web'
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
			tokenPromise: function() {
				return $q(function(resolve) {
					// check for a valid token until you get one
					var tokenCheck = $interval(function() {
						var token = $localStorage.token;
						if(!(window.isEmpty(token) && jwtHelper.isTokenExpired(token))) {
							$interval.cancel(tokenCheck);
							resolve(jwtHelper.decodeToken(token));
						}
					},100);
				});
			},
            token: function() {
                var token = $localStorage.token;
                return jwtHelper.decodeToken(token)
            }
		};
	}
})();