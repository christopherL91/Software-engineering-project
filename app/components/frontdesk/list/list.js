(function() {
	'use strict';

	angular
		.module('portfolioApp.list',['ngDialog','angularMoment'])
		.controller('GuestListController',GuestListController);

		GuestListController.$inject = ['listService','ngDialog'];

		function GuestListController(listService,ngDialog,token) {
			var vm = this;
			vm.guests = listService.getGuests;

			vm.openCurrentModal = function(guest) {
				ngDialog.open({
					template:'components/frontdesk/modal/current.html',
                	controller:'ModalController as modal',
                	data: guest
				});
			};

            vm.openFutureModal = function(guest) {
                ngDialog.open({
                    template:'components/frontdesk/modal/future.html',
                    controller:'ModalController as modal',
                    data: guest
                });
            };
		}
})();