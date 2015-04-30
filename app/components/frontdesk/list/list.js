(function() {
	'use strict';

	angular
		.module('portfolioApp.list',['ngDialog','angularMoment'])
		.controller('GuestListController',GuestListController)

		GuestListController.$inject = ['listService','ngDialog'];

		function GuestListController(listService,ngDialog) {
			var vm = this;
			vm.guests = listService.getGuests;

			vm.openModal = function(guest) {
				ngDialog.open({
					template:'components/frontdesk/modal/modal.html',
                	controller:'settingsController as settings',
                	data: guest
				});
			};
		}
})();