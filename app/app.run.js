(function() {
	'use strict';

	angular
		.module('portfolioApp')
		.run(runBlock);

	runBlock.$inject = ['$rootScope','AuthService','$location'];	
	function runBlock($rootScope,AuthService,$location) {
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
			if(AuthService.isAuthenticated()) {
				if(toState.url === '/login' || toState.url === '/forgot') {
					$location.path('/frontdesk');
				}
 			} else {
 				if(!(toState.url === '/login' || toState.url === '/forgot')) {
 					$location.path('/login');
 				}
 			}
		});
	}
})();