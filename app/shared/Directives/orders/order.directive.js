(function() {
	'use strict';

	angular
		.module('portfolioApp.widgets',[])
		.directive('guestOrder',GuestOrder);

		function GuestOrder() {
			var directive = {
        		restrict: 'E',
        		templateUrl: 'shared/Directives/orders/order.directive.html',
        		scope: {
            		order: '='
        		},
        		link: linkFunc,
        		controller: orderController,
       			controllerAs: 'orderCtrl',
        		bindToController: true
    		};
	    	return directive;

	    	function linkFunc(scope, element, attrs) {
	    	}
		}

		orderController.$inject = ['$interval','$scope','roomOrderService'];

		function orderController($interval,$scope,roomOrderService) {
			var vm = this;

			vm.confirm = function() {
                roomOrderService.done(vm.order);
			};

			$scope.$on('$destroy', function() {
        		// $interval.cancel(checkTime);
        	});
		}
})();