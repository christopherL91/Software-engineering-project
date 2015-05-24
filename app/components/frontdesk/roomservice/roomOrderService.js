(function() {
    'use strict';

    angular
        .module('portfolioApp.roomservice')
        .factory('roomOrderService',roomOrderService);

    roomOrderService.$inject = ['$http','SERVER_INFO','toastr','streamService','EVENTS','$q'];

    function roomOrderService($http,SERVER_INFO,toastr,streamService,EVENTS,$q) {
        var orders = [];

        var service = {
            getOrders : getOrders,
            done: done,
            remove: remove
        };

        return service;
        //////////////////////////

        function getOrders() {
            var deferred = $q.defer();

            if(orders.length > 0) {
                // Old orders are already there.
                deferred.resolve(orders);
            }else {
                $http({
                    method: 'GET',
                    url: SERVER_INFO.address + '/api/roomservice',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                    .then(function (response) {
                        var new_orders = response.data.orders;
                        if (!angular.isArray(new_orders)) {
                            // only one element
                            orders.push(new_orders);
                        } else {
                            new_orders.forEach(function (order) {
                                orders.push(order);
                            });
                        }
                        deferred.resolve({
                            orders:orders
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                        toastr.warning('Roomservice orders not found', 'Could not find roomservice orders due to an error', {
                            extendedTimeOut: 0,
                            maxOpened: 5,
                            tapToDismiss: true,
                            timeOut: 0,
                            positionClass: 'toast-bottom-right'
                        });
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        }

        function remove(order) {
            var id = order._id;
            for(var i = 0; i < orders.length; i++) {
                if(orders[i]._id === id) {
                    orders.splice(i,1);
                }
            }
        }

        function done(order) {
            var id = order._id;
            for(var i = 0; i < orders.length; i++) {
                if(orders[i]._id === id) {
                    orders.splice(i,1);
                }
            }
            $http({
                method: 'DELETE',
                url : SERVER_INFO.address + '/api/roomservice',
                data: order,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(function(data) {
                    console.log(data);
                    streamService.socket.emit(EVENTS.remove_order,{
                        order: order
                    });
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.warning(err.data, 'Internal server error', {
                        extendedTimeOut: 0,
                        maxOpened: 5,
                        tapToDismiss: true,
                        timeOut: 0
                    });
                });
        }
    }
})();