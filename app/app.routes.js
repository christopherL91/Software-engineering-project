(function() {
    'use strict';

    angular
        .module('portfolioApp')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
        	$stateProvider
        	 	.state('login',{
        	 		url:'/login',
        	 		templateUrl:'components/login/login.html',
        	 		controller:'LoginController as login'
        	 	})
                .state('forgot',{
                    url:'/forgot',
                    templateUrl:'components/forgot/forgot.html',
                    controller:'ForgotController as forgot'
                })
                .state('frontdesk',{
                    url:'/frontdesk',
                    abstract: true,
                    templateUrl:'/components/frontdesk/main/main.html',
                    controller: function(AuthService,$state,$rootScope,EVENTS) {
                        var vm = this;
                        $rootScope.$on(EVENTS.new_guest,function(event,guest) {
                            vm.event = 'New guest checked in ' + guest.name;
                        });
                        $rootScope.$on(EVENTS.remove_guest,function(event,guest) {
                            vm.event = guest.name + ' just checked out';
                        });
                        vm.logout = function() {
                            AuthService.logout().then(function() {
                                $state.go('login');
                            });
                        }
                    },
                    controllerAs: 'frontdesk'
                })
                .state('frontdesk.guests',{
                    url:'',
                    templateUrl:'/components/frontdesk/list/list.html',
                    controller:'GuestListController as list'
                })
                .state('frontdesk.roomservice',{
                    url:'/roomservice',
                    templateUrl:'/components/frontdesk/roomservice/roomservice.html',
                    controller:'roomserviceController as roomservice'
                })
                .state('frontdesk.history',{
                    url:'/history',
                    templateUrl:'/components/frontdesk/history/history.html',
                    controller:'historyController as history'
                });
        });
})();
