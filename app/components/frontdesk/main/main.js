(function() {
    'use strict';
    angular
        .module('portfolioApp.main',['ngDialog','ngAnimate','toastr'])
        .controller('mainController',mainController);

    mainController.$inject = ['settingsPrepService','$state','ngDialog','AuthService','streamService','EVENTS'];

    function mainController(settingsPrepService,$state,ngDialog,AuthService,streamService,EVENTS) {
        var vm = this;
        var settingDialogID;

        vm.settings = settingsPrepService;

        streamService.socket.on(EVENTS.new_settings,function(settings) {
            vm.settings = settings;
        });

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
            ngDialog.open({
                template: '/components/frontdesk/bugreport/bugreport.html',
                controller: 'bugController as bug'
            });
        };

        vm.logout = function() {
            AuthService.logout().then(function() {
                $state.go('login');
            });
        };
    }
})();