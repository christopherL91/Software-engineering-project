(function() {
    'use strict';

    angular
        .module('portfolioApp', [
    	'ui.router',
        'portfolioApp.main',
        'portfolioApp.login',
        'portfolioApp.forgot',
        'portfolioApp.list',
        'portfolioApp.AuthService',
        'portfolioApp.streamService',
        'portfolioApp.modal',
        'portfolioApp.roomservice',
        'portfolioApp.history',
        'portfolioApp.widgets',
        'portfolioApp.settings',
        'angular-jwt'
        ])
        .constant('SERVER_INFO',{
            address: 'http://lillthors.ninja:5000',
            websocket: 'ws://localhost:8080/ws'
            // websocket:'ws://echo.websocket.org/'
        })
        .constant('EVENTS',{
            new_guest: 'NEW_GUEST',
            remove_guest: 'REMOVE_GUEST'
        })
        .config(AppConfig)
        .controller('AppController', AppController);

        AppConfig.$inject = ['$httpProvider','jwtInterceptorProvider','toastrConfig'];

        function AppController() {
        }

        function AppConfig($httpProvider,jwtInterceptorProvider,toastrConfig) {
            jwtInterceptorProvider.tokenGetter = function() {
                var token = window.localStorage.getItem('ngStorage-token');
                return JSON.parse(token);
            };
            $httpProvider.interceptors.push('jwtInterceptor');

            angular.extend(toastrConfig, {
                maxOpened: 1,
                newestOnTop: true,
                tapToDismiss: true,
                positionClass: 'toast-bottom-right'
            });
        }
})();
