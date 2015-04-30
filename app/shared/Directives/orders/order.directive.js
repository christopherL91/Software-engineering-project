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

		orderController.$inject = ['$interval','$scope'];

		function orderController($interval,$scope) {
			var vm = this;

			// var checkTime = $interval(function() {
			// 	var now = new Date();
			// 	var orderTime = new Date(vm.order.time);
			// 	if(orderTime < now) {
			// 		orderTime.setDate(orderTime.getDate() + 1);
			// 	}
			// 	var diff = orderTime - now;
			// 	var minutes = Math.floor(diff/1000/60);
			// 	console.log(minutes);
			// 	if(minutes <= 5) {
			// 		console.log('ASAP');
			// 		vm.order.time = 'ASAP';
			// 		$interval.cancel(checkTime);
			// 	}
			// },1000);

			vm.confirm = function() {
				console.log(vm.order);
			}

			$scope.$on('$destroy', function() {
        		// $interval.cancel(checkTime);
        	});
		}
})();