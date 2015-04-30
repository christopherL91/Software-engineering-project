(function() {
	'use strict';

	angular
		.module('portfolioApp.roomservice')
		.factory('roomOrderService',roomOrderService);

		roomOrderService.$inject = ['$http'];

		function roomOrderService($http) {
			var orders = [];

			$http.get('orders.json')
				.then(function(response) {
					response.data.forEach(function(order) {
						orders.push(order);
					});
				})
				.catch(function(err) {
					alert(err.data);
				});

				var service = {
					orders:orders
				};

				return service;
				/////////////////////////////
		}
})();