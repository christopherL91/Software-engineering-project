(function() {
	'use strict';

	angular
		.module('portfolioApp')
		.run(runBlock);

	runBlock.$inject = ['$rootScope','jwtHelper','$location','$state','$localStorage','usSpinnerService'];
	function runBlock($rootScope,jwtHelper,$location,$state,$localStorage,usSpinnerService) {
		$rootScope.$on('$stateChangeStart',function(event, toState) {
            var token = $localStorage.token;
            if(token && !(window.isEmpty(token) && jwtHelper.isTokenExpired(token))) {
                usSpinnerService.spin('loading');
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

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            usSpinnerService.stop('loading');
        });

        $rootScope.$on('$stateChangeError',function() {
            usSpinnerService.stop('loading');
        });
	}
})();