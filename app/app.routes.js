(function() {
    'use strict';

    angular
        .module('portfolioApp')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
        	$stateProvider
        	 	.state('login',{
        	 		url:'/login',
        	 		templateUrl:'/components/login/login.html',
        	 		controller:'LoginController as login'
        	 	})
                .state('forgot',{
                    url:'/forgot',
                    templateUrl:'/components/forgot/forgot.html',
                    controller:'ForgotController as forgot'
                })
                .state('frontdesk',{
                    url:'/frontdesk',
                    abstract: true,
                    templateUrl:'/components/frontdesk/main/main.html',
                    controller:'mainController as frontdesk'
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
