(function() {
    'use strict';
    angular
        .module('portfolioApp.main',['ngDialog','ngAnimate','toastr'])
        .controller('mainController',mainController);

    mainController.$inject = ['$state','$rootScope','ngDialog','toastr','AuthService','EVENTS','token','streamService'];

    function mainController($state,$rootScope,ngDialog,toastr,AuthService,EVENTS,token,streamService) {
        var vm = this;
        var settingDialogID;

        streamService.socket.on(EVENTS.remove_guest,function(data) {
            var guest = data.guest;
            if(data.client_id !== token.client_id) {
                //listService.removeGuests.removeCurrentGuest(guest);
                var message = guest.familyname +' ' +guest.surname;
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
            if(data.client_id !== token.client_id) {
                //listService.removeGuests.removeFutureGuest(guest);
                var message = guest.familyname +' ' +guest.surname;
                toastr.info(message, 'New guest just checked in...', {
                    extendedTimeOut: 0,
                    maxOpened: 5,
                    tapToDismiss: true,
                    timeOut: 0,
                    positionClass: 'toast-top-left'
                });
            }
        });

        $rootScope.$on('new_settings', function (event,settings) {
            vm.hotelname = settings.name;
            vm.address = settings.address;
        });

        //öppna inställningar.
        vm.openSettings = function() {
            if(!settingDialogID) {
                var dialog = ngDialog.open({
                    template: '/components/frontdesk/settings/settings.html',
                    controller: 'settingsController as settings'
                });
                settingDialogID = dialog.id;
                dialog.closePromise.then(function() {
                    settingDialogID = null;
                });
            }
        };

        vm.openBugReport = function() {
            var dialog = ngDialog.open({
                template: '/components/frontdesk/bugreport/bugreport.html',
                controller: 'bugController as bug'
            });
            dialog.closePromise.then(function() {
                toastr.info('We will look through your bug report and we will get back to you ASAP', ' Thank you', {
                    extendedTimeOut: 0,
                    maxOpened: 5,
                    tapToDismiss: true,
                    timeOut: 0
                });
            });
        };

        //Hämta senaste information om vilka inställningar som gjorts.
        AuthService.info()
            .then(function(response) {
                var res = response.data.info;
                vm.hotelname = res.name;
                vm.address = res.address;
            })
            .catch(function(err) {
                console.log(err);
                toastr.warning('Server error', 'Kunde inte hämta information om hotellet', {
                    extendedTimeOut: 0,
                    maxOpened: 5,
                    tapToDismiss: true,
                    timeOut: 0,
                    // Kolla detta...
                    positionClass: 'toast-top-left'
                });
            });

        //logga ut användaren från systemet.
        vm.logout = function() {
            AuthService.logout().then(function() {
                $state.go('login');
            });
        };
    }
})();