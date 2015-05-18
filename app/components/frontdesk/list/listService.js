(function() {
    'use strict';

    angular
        .module('portfolioApp.list')
        .factory('listService', listService);

    listService.$inject = ['$http','$rootScope','SERVER_INFO','EVENTS'];

    function listService($http,$rootScope,SERVER_INFO,EVENTS) {
        var currentGuests = [];
        var arrivingGuests = [];

        // TODO Check for checkin/checkout bug!!!!! Check for entries in DB and correct it before demo.
        $http({
            method: 'GET',
            url : SERVER_INFO.address + '/api/current',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(function(response) {
                response.data.guests.forEach(function(guest) {
                    currentGuests.push(guest);
                });
            })
            .catch(function(error) {
                alert(error);
            });

        $http({
            method: 'GET',
            url : SERVER_INFO.address + '/api/future',
            data: '',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(function(response) {
                response.data.guests.forEach(function(guest) {
                    arrivingGuests.push(guest);
                });
            })
            .catch(function(error) {
                alert(error);
            });

        var service = {
            getGuests: {
                currentGuests:currentGuests,
                arrivingGuests:arrivingGuests
            },
            removeGuests : {
                removeCurrentGuest: removeCurrentGuest,
                removeFutureGuest: removeFutureGuest
            }
        };
        return service;
        ////////////////////// define functions here.

        function removeCurrentGuest(guest) {
            $http({
                method: 'DELETE',
                url : SERVER_INFO.address + '/api/current',
                data: {
                    guest_id: guest._id
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(function(response) {
                    console.log(response);
                    var id = guest._id;
                    for(var i = 0; i < currentGuests.length; i++) {
                        if(currentGuests[i]._id === id) {
                            currentGuests.splice(i,1);
                        }
                    }
                })
                .catch(function(error) {
                    alert(error);
                });
        }

        function removeFutureGuest(guest) {
            $http({
                method: 'DELETE',
                url : SERVER_INFO.address + '/api/future',
                data: {
                    guest_id : guest._id
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(function(response) {
                    console.log(response);
                    var id = guest._id;
                    for(var i = 0; i < arrivingGuests.length; i++) {
                        if(arrivingGuests[i]._id === id) {
                            arrivingGuests.splice(i,1);
                        }
                    }
                    return $http({
                        method: 'POST',
                        url : SERVER_INFO.address + '/api/current',
                        data: guest,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    })
                })
                .then(function(response) {
                    console.log(response);
                    console.log(guest);
                    currentGuests.push(guest);
                })
                .catch(function(err) {
                    console.log(err);
                    alert(error.data);
                });
        }
    }
})();