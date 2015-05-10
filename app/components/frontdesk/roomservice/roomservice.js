(function() {
	'use strict';

	angular
		.module('portfolioApp.roomservice',['toastr'])
		.controller('roomserviceController',roomserviceController);

		roomserviceController.$inject = ['roomOrderService'];

		function roomserviceController(roomOrderService) {
			var vm = this;
			vm.orders = roomOrderService.orders;
		}
})();