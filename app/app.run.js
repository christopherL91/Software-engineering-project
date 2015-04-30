(function() {
	'use strict';

	angular
		.module('portfolioApp')
		.run(runBlock);

	runBlock.$inject = ['$rootScope','AuthService','$location','$state'];	
	function runBlock($rootScope,AuthService,$location,$state) {
		var requestedState = null;
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
			if(AuthService.isAuthenticated()) {
				if(toState.url === '/login' || toState.url === '/forgot') {
					$location.path('/frontdesk');
				}
 			}else {
 				if(!(toState.url === '/login' || toState.url === '/forgot')) {
 					event.preventDefault();
 					$state.go('login');
 				}
 			}
		});
	}
})();