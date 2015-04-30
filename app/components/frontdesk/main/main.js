(function() {
	'use strict';
	angular
		.module('portfolioApp.main',['ngDialog'])
		.controller('mainController',mainController);

		mainController.$inject = ['$state','$rootScope','ngDialog','AuthService','EVENTS']

		function mainController($state,$rootScope,ngDialog,AuthService,EVENTS) {
			var vm = this;
            
            $rootScope.$on(EVENTS.new_guest,function(event,guest) {
                vm.event = 'New guest checked in ' + guest.name;
            });

            $rootScope.$on(EVENTS.remove_guest,function(event,guest) {
                vm.event = guest.name + ' just checked out';
            });

            vm.openSettings = function() {
                ngDialog.open({
                    template:'/components/frontdesk/settings/settings.html',
                    controller:'settingsController as settings'
                });
            };

            vm.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('login');
                });
            };
		}
})();