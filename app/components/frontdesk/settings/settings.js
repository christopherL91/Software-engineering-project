(function() {
	'use strict';

	angular
		.module('portfolioApp.settings',['ngAnimate','toastr'])
		.controller('settingsController',settingsController);

		settingsController.$inject = ['$scope','settingsService','toastr'];

		function settingsController($scope,settingsService,toastr) {
			var vm = this;
			
			vm.update = function(settings) {
                settingsService.update(settings)
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(err) {
                        toastr.warning(err.data, 'Could not set the new setting due to an error', {
                            extendedTimeOut: 0,
                            maxOpened: 5,
                            timeOut: 5000,
                            positionClass: 'toast-bottom-right'
                        });
                    });
				$scope.closeThisDialog();
			};

			vm.close = function() {
				$scope.closeThisDialog();
			};
		}
})();