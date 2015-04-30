(function() {
	'use strict';

	angular
		.module('portfolioApp.streamService', [
			'angular-websocket'
		])
		.factory('streamService',streamService);

		streamService.$inject = ['$websocket','$rootScope','$interval','SERVER_INFO','EVENTS'];

		function streamService($websocket,$rootScope,$interval,SERVER_INFO,EVENTS) {
			var dataStream = null;
			
			// Fake data
			$interval(function() {
				send({
					type:'new_guest',
					id:1,
					surname:"anders",
					familyname:"andersson",
					age:21,
					country:"sweden",
					language:"swedish",
					hotel:"nordic light",
					email:"anders@foo.com",
					mode:"business",
					room:1234,
					in: "2015-10-05",
					out: "2015-10-10",
					image:"http://lorempixel.com/50/50/"
				});
			},10000);

			var service = {
				open : open,
				close: close,
				send : send
			};

			return service;
			////////////////////////////

			function send(data) {
				if(dataStream) {
					dataStream.send(data);
				}
			}

			function open() {
				if(!dataStream) {
					console.log('opening websocket');
					dataStream = $websocket(SERVER_INFO.websocket);
					dataStream.onMessage(function(message) {
        				var data = JSON.parse(message.data);
        				switch(data.type) {
        					case "new_guest":
        						$rootScope.$emit(EVENTS.new_guest,data);
        						break;
        					case "remove_guest":
        						$rootScope.$emit(EVENTS.remove_guest,data);
        						break;
        					default:
        						console.log('unknown message',data);
        				}
      				});
				}
			}

			function close() {
				if(dataStream) {
					console.log('closing websocket');
					dataStream.close();
				}
			}
		}
})();