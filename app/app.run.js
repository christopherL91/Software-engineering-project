(function() {
	'use strict';

	angular
		.module('portfolioApp')
		.run(runBlock);

	runBlock.$inject = ['$rootScope','jwtHelper','$location','$state','$localStorage'];
	function runBlock($rootScope,jwtHelper,$location,$state,$localStorage) {
		$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams) {
            var token = $localStorage.token;
            if(token && !(window.isEmpty(token) && jwtHelper.isTokenExpired(token))) {
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