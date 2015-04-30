(function() {
	'use strict';

	angular
		.module('portfolioApp.roomservice',[])
		.controller('roomserviceController',roomserviceController);

		roomserviceController.$inject = ['roomOrderService'];

		function roomserviceController(roomOrderService) {
			var vm = this;
			vm.orders = roomOrderService.orders;
		}
})();