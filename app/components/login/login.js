(function() {
    'use strict';

    angular
        .module('portfolioApp.login',['angular-jwt'])
        .controller('LoginController', LoginController);

        LoginController.$inject = ['AuthService','$state'];

        function LoginController(AuthService,$state) {
            var vm = this;

            vm.login = function(user) {
                AuthService.login(user)
                    .then(function(data) {
                        $state.go('frontdesk.guests');
                    })
                    .catch(function(error) {
                        alert(error);
                    });
            };
        };
})();
