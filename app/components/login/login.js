(function() {
    'use strict';

    angular
        .module('portfolioApp.login',['angular-jwt','toastr'])
        .controller('LoginController', LoginController);

        LoginController.$inject = ['AuthService','$state','toastr'];

        function LoginController(AuthService,$state,toastr) {
            var vm = this;

            vm.login = function(user) {
                AuthService.login(user)
                    .then(function(data) {
                        $state.go('frontdesk.guests');
                    })
                    .catch(function(err) {
                        console.log(err);
                        toastr.error(err.data.status, 'Invalid credentials', {
                            maxOpened: 1,
                            timeOut: 5000
                        });
                    });
            };
        }
})();
