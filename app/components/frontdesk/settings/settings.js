(function() {
	'use strict';

	angular
		.module('portfolioApp.settings',[])
		.controller('settingsController',settingsController);

		settingsController.$inject = ['$scope'];

		function settingsController($scope) {
			var vm = this;
			
			vm.update = function(settings) {
				console.log(settings);
			}

			vm.close = function() {
				$scope.closeThisDialog();
			}
		}
})();