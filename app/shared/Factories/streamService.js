(function() {
	'use strict';

	angular
		.module('portfolioApp.streamService', [
			'btford.socket-io'
		])
		.factory('streamService',streamService);

	streamService.$inject = ['socketFactory','SERVER_INFO'];

	function streamService(socketFactory,SERVER_INFO) {
		var socket = socketFactory({
			ioSocket: io.connect(SERVER_INFO.websocket),
			prefix: ''
		});

		var service = {
			socket: socket
		};

		return service;
		////////////////////////////
	}
})();