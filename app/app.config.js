(function() {
	'use strict';

	module('portfolioApp')
	.config(AppConfig)
		AppConfig.$inject = ['$httpProvider','jwtInterceptorProvider'];

		function AppConfig($httpProvider,jwtInterceptorProvider) {
		}
})();