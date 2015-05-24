(function() {
    "use strict";

    angular
        .module('portfolioApp.settings')
        .factory('settingsService',settingsService);

        settingsService.$inject = ['$http','$q','streamService','SERVER_INFO','EVENTS'];
        function settingsService($http,$q,streamService,SERVER_INFO,EVENTS) {

            var service = {
                update: update,
                getSettings: getSettings
            };

            return service;

            //////////////////////////// Functions goes here.

            function getSettings() {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url : SERVER_INFO.address + '/api/info',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                    .then(function(response) {
                        deferred.resolve(response.data.info);
                    });
                return deferred.promise;
            }

            function update(settings) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url : SERVER_INFO.address + '/api/info',
                        data: {
                            settings: settings
                        },
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    })
                    .then(function(response) {
                        streamService.socket.emit(EVENTS.new_settings,settings);
                        deferred.resolve(response);
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        }
})();