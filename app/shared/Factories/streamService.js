(function() {
	'use strict';

	angular
		.module('portfolioApp.streamService', [
            'btford.socket-io'
		])
		.factory('streamService',streamService);

		streamService.$inject = ['socketFactory','$rootScope','$interval','SERVER_INFO','EVENTS'];

		function streamService(socketFactory,$rootScope,$interval,SERVER_INFO,EVENTS) {

			var service = {
			};

			return service;
			////////////////////////////
		}
})();