(function() {
    "use strict";

    angular
        .module('portfolioApp.settings')
        .factory('settingsService',settingsService);

        settingsService.$inject = ['$http','$rootScope','$q'];
        function settingsService($http,$rootScope,$q) {

            var service = {
                update: update
            };

            return service;

            //////////////////////////// Functions goes here.

            function update(settings) {
                var deferred = $q.defer();
                $http({
                        method: 'POST',
                        url : 'http://localhost:3000/api/info',
                        data: {
                            settings: settings
                        },
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    })
                    .then(function(response) {
                        // Inform main controller that a new setting has been set.
                        $rootScope.$emit('new_settings',settings);
                        deferred.resolve(response);
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        }
})();