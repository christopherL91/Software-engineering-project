(function() {
	'use strict';

	angular
		.module('portfolioApp.roomservice')
		.factory('roomOrderService',roomOrderService);

		roomOrderService.$inject = ['$http','SERVER_INFO','toastr'];

		function roomOrderService($http,SERVER_INFO,toastr) {
			var orderslist = [];

			$http({
                    method: 'GET',
                    url : 'http://localhost:3000/api/roomservice',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
				.then(function(response) {
                    var orders = response.data.orders;
                    if (angular.isArray(orders)){
                        orders.forEach(function (order){
                            orderslist.push(order);
                        });
                    } else {
                        // only one element
                        orderslist.push(orders);
                    }
				})
				.catch(function(err) {
					console.log(err);
                    toastr.warning('Roomservice orders not found', 'Could not find roomservice orders due to an error', {
                        extendedTimeOut: 0,
                        maxOpened: 5,
                        tapToDismiss: true,
                        timeOut: 0,
                        // Kolla detta...
                        positionClass: 'toast-bottom-right'
                    });
				});

				var service = {
					orders:orderslist,
                    done: done
				};

				return service;
				/////////////////////////////

                function done(order) {
                    var id = order._id;
                    for(var i = 0; i < orderslist.length; i++) {
                        if(orderslist[i]._id === id) {
                            console.log(orderslist[i]);
                            orderslist.splice(i,1);
                        }
                    }
                    alert('Will now send a message to server...');
                }
		}
})();