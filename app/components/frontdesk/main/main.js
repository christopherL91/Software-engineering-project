(function() {
	'use strict';
	angular
		.module('portfolioApp.main',['ngDialog','ngAnimate','toastr'])
		.controller('mainController',mainController);

		mainController.$inject = ['$state','$rootScope','ngDialog','toastr','AuthService','EVENTS','token'];

		function mainController($state,$rootScope,ngDialog,toastr,AuthService,EVENTS,token) {
			var vm = this;
            console.log(token);
            var settingDialogID;

            $rootScope.$on(EVENTS.new_guest,function(event,guest) {
                toastr.info(guest.name, 'Ny gäst checkade in', {
                    extendedTimeOut: 0,
                    maxOpened: 5,
                    tapToDismiss: true,
                    timeOut: 0,
                    // Kolla detta...
                    positionClass: 'toast-top-left'
                });
            });

            $rootScope.$on(EVENTS.remove_guest,function(event,guest) {
                toastr.info(guest.name, 'Gäst checkade ut', {
                    extendedTimeOut: 0,
                    maxOpened: 5,
                    tapToDismiss: true,
                    timeOut: 0,
                    // Kolla detta...
                    positionClass: 'toast-top-left'
                });
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