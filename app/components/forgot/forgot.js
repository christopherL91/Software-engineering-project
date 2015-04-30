(function() {
	'use strict';

	angular
		.module('portfolioApp.forgot',['ngDialog'])
		.controller('ForgotController',ForgotController);

		ForgotController.$inject = ['AuthService','ngDialog','$state'];

		function ForgotController(AuthService,ngDialog,$state) {
			var vm = this;

			vm.reset = function(user) {
                AuthService.forgot(user)
                    .then(function(response) {
                        ngDialog.openConfirm({
                        	template:'./reset.html',
                        	scope:vm,
                        	data:user
                        });
                    })
                    .catch(function(error) {
                        vm.error = 'Could not find any account with this email';
                    });
            }

            vm.confirm = function() {
            	vm.closeThisDialog();
            	$state.go('login');
            }
		}
})();