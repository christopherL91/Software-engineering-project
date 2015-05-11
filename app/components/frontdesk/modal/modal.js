(function() {
	'use strict';

	angular
		.module('portfolioApp.modal',[])
		.controller('ModalController',ModalController);

		ModalController.$inject = ['$scope','streamService','listService','ngDialog'];

		function ModalController($scope,streamService,listService,ngDialog) {
			var vm = this;

			vm.checkout = function() {
				var guest = $scope.ngDialogData;
                listService.removeGuests.removeCurrentGuest(guest);
				$scope.closeThisDialog();
			};

			vm.checkin = function() {
				var guest = $scope.ngDialogData;
                listService.removeGuests.removeFutureGuest(guest);
				$scope.closeThisDialog();
			};

			vm.messageDialog = function() {
				ngDialog.close('ngdialog1');
				ngDialog.open({
						template: 'components/frontdesk/modal/message.html',
						controller: 'ModalController as modal',
						data: $scope.ngDialogData
					});
			};

			// TODO
			vm.sendMessage = function(message) {
                alert('Will send the following message: ' + vm.message);
				$scope.closeThisDialog();
			};
		}
})();