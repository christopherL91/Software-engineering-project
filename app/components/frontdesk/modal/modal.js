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
				streamService.send({
					type:'remove_guest',
					name: guest.name,
					id:guest.id
				});
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

			vm.sendMessage = function() {
				streamService.send({
					type: 'message',
					body: vm.message
				});
				$scope.closeThisDialog();
			};
		}
})();