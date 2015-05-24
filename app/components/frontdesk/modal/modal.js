(function() {
    'use strict';

    angular
        .module('portfolioApp.modal',[])
        .controller('ModalController',ModalController);

    ModalController.$inject = ['$scope','streamService','listService','ngDialog','EVENTS','AuthService'];

    function ModalController($scope,streamService,listService,ngDialog,EVENTS,AuthService) {
        var vm = this;
        var token = AuthService.token();

        vm.checkout = function() {
            var guest = $scope.ngDialogData;
            listService.removeGuests.updateCurrentGuests(guest);
            $scope.closeThisDialog();
        };

        vm.checkin = function() {
            var guest = $scope.ngDialogData;
            listService.removeGuests.updateFutureGuests(guest);
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
        vm.sendMessage = function() {
            alert('Will send the following message: ' + vm.message);
            $scope.closeThisDialog();
        };
    }
})();