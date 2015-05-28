(function() {
    'use strict';

    angular
        .module('portfolioApp.list',['ngDialog','angularMoment'])
        .controller('GuestListController',GuestListController);

    GuestListController.$inject = ['guestListPrepService','listService','ngDialog','streamService','EVENTS','toastr'];

    function GuestListController(guestListPrepService,listService,ngDialog,streamService,EVENTS,toastr) {
        var vm = this;
        vm.guests = guestListPrepService;

        streamService.socket.on(EVENTS.remove_guest,function(data) {
            var guest = data.guest;
            if(listService.removeGuests.removeCurrentGuest(guest)) {
                var message = guest.familyname + ' ' + guest.surname;
                toastr.info(message, 'New guest just checked out...', {
                    extendedTimeOut: 0,
                    maxOpened: 5,
                    tapToDismiss: true,
                    timeOut: 0,
                    positionClass: 'toast-top-left'
                });
            }
        });

        streamService.socket.on(EVENTS.new_guest,function(data) {
            var guest = data.guest;
            if(listService.removeGuests.removeFutureGuest(guest)) {
                listService.removeGuests.addCurrentGuest(guest);
                var message = guest.familyname + ' ' + guest.surname;
                toastr.info(message, 'New guest just checked in...', {
                    extendedTimeOut: 0,
                    maxOpened: 5,
                    tapToDismiss: true,
                    timeOut: 0,
                    positionClass: 'toast-top-left'
                });
            }
        });

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