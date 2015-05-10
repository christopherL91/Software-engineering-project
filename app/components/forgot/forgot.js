(function() {
	'use strict';

	angular
		.module('portfolioApp.forgot',['ngDialog','toastr'])
		.controller('ForgotController',ForgotController);

		ForgotController.$inject = ['AuthService','ngDialog','$state','toastr'];

		function ForgotController(AuthService,ngDialog,$state,toastr) {
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
                    .catch(function(err) {
						console.log(err);
						toastr.warning('Email not found', 'Could not find any user with this email', {
							extendedTimeOut: 0,
							maxOpened: 5,
							tapToDismiss: true,
							timeOut: 0,
							// Kolla detta...
							positionClass: 'toast-bottom-right'
						});
                    });
            };

            vm.confirm = function() {
            	vm.closeThisDialog();
            	$state.go('login');
            };
		}
})();