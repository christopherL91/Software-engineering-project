(function() {
    'use strict';

    angular
        .module('portfolioApp.list')
        .factory('listService', listService);

    listService.$inject = ['$http','SERVER_INFO','streamService','EVENTS','$q'];

    function listService($http,SERVER_INFO,streamService,EVENTS,$q) {
        var currentGuests = [];
        var arrivingGuests = [];

        var service = {
            getGuests: getGuests,
            removeGuests : {
                updateCurrentGuests: updateCurrentGuests,
                updateFutureGuests: updateFutureGuests,
                addCurrentGuest: addCurrentGuest,
                removeCurrentGuest: removeCurrentGuest,
                removeFutureGuest: removeFutureGuest
            }
        };
        return service;
        ////////////////////// define functions here.

        function getGuests() {
            var deferred = $q.defer();
            if(currentGuests.length > 0 || arrivingGuests.length > 0) {
                deferred.resolve({
                    currentGuests : currentGuests,
                    arrivingGuests: arrivingGuests
                });
            }else {
                var currentPromise = $http({
                    method: 'GET',
                    url: SERVER_INFO.address + '/api/current',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });

                var futurePromise = $http({
                    method: 'GET',
                    url: SERVER_INFO.address + '/api/future',
                    data: '',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });

                $q.all([currentPromise, futurePromise])
                    .then(function(result) {
                        var current = result[0].data.guests;
                        var future = result[1].data.guests;

                        current.forEach(function(guest) {
                           currentGuests.push(guest);
                        });

                        future.forEach(function(guest) {
                           arrivingGuests.push(guest);
                        });

                        deferred.resolve({
                            currentGuests : currentGuests,
                            arrivingGuests: arrivingGuests
                        });
                    });
            }
            return deferred.promise;
        }

        function updateCurrentGuests(guest) {
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
                .then(function() {
                    streamService.socket.emit(EVENTS.remove_guest,{
                        guest: guest
                    });
                    removeCurrentGuest(guest);
                })
                .catch(function(error) {
                    alert(error);
                });
        }

        function addCurrentGuest(guest) {
            currentGuests.push(guest);
        }

        function removeCurrentGuest(guest) {
            var id = guest._id;
            for(var i = 0; i < currentGuests.length; i++) {
                if(currentGuests[i]._id === id) {
                    currentGuests.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function removeFutureGuest(guest) {
            var id = guest._id;
            for(var i = 0; i < arrivingGuests.length; i++) {
                if(arrivingGuests[i]._id === id) {
                    arrivingGuests.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function updateFutureGuests(guest) {
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
                    removeFutureGuest(guest);
                    return $http({
                        method: 'POST',
                        url : SERVER_INFO.address + '/api/current',
                        data: guest,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    })
                })
                .then(function() {
                    streamService.socket.emit(EVENTS.new_guest,{
                        guest: guest
                    });
                    addCurrentGuest(guest);
                })
                .catch(function(err) {
                    console.log(err);
                    alert(error.data);
                });
        }
    }
})();