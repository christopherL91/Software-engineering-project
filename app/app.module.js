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
            'portfolioApp.bugreport',
            'portfolioApp.settings',
            'angular-jwt',
            'angular.filter'
        ])
        .constant('SERVER_INFO',{
            //address: 'http://lillthors.ninja:5000',
            address: 'http://localhost:5000',
            //websocket: 'http://lillthors.ninja:5000'
            websocket: 'http://localhost:5000'
        })
        .constant('EVENTS',{
            new_guest: 'NEW_GUEST',
            remove_guest: 'REMOVE_GUEST',
            remove_order: 'REMOVE_ORDER'
        })
        .config(AppConfig)
        .controller('AppController', AppController);

        AppConfig.$inject = ['$httpProvider','jwtInterceptorProvider','toastrConfig'];

        function AppController() {
        }

        function AppConfig($httpProvider,jwtInterceptorProvider,toastrConfig) {
            jwtInterceptorProvider.tokenGetter = ['$localStorage',function($localStorage) {
                return $localStorage.token;
            }];

            $httpProvider.interceptors.push('jwtInterceptor');

            angular.extend(toastrConfig, {
                maxOpened: 1,
                newestOnTop: true,
                tapToDismiss: true,
                positionClass: 'toast-bottom-right'
            });
        }
})();
