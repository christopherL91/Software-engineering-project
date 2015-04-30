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
        'angular-jwt',
        ])
        .constant('SERVER_INFO',{
            address: 'http://lillthors.ninja:3000',
            // websocket: 'ws://127.0.0.1:3000/ws'
            websocket:'ws://echo.websocket.org/'
        })
        .constant('EVENTS',{
            new_guest: 'NEW_GUEST',
            remove_guest: 'REMOVE_GUEST'
        })
        .config(AppConfig)
        .controller('AppController', AppController);

        AppConfig.$inject = ['$httpProvider','jwtInterceptorProvider'];

        function AppController() {
        }

        function AppConfig($httpProvider,jwtInterceptorProvider) {
            jwtInterceptorProvider = function() {
                return window.localStorage.getItem('ngStorage-token');
            }
            // Use interceptor for all HTTP calls
            $httpProvider.interceptors.push('jwtInterceptor');
        }
})();
