(function() {
	'use strict';

	angular
		.module('portfolioApp.list')
		.factory('listService', listService);

		listService.$inject = ['$http','$q','$rootScope','AuthService','SERVER_INFO','EVENTS'];

		function listService($http,$q,$rootScope,AuthService,SERVER_INFO,EVENTS) {
			var currentGuests = [];
			var arrivingGuests = [];

			$http.get('currentGuests.json')
			.then(function(response) {
				response.data.forEach(function(guest) {
					currentGuests.push(guest);
				});
			})
			.catch(function(error) {
				alert(error);
			});

			$http.get('arrivingGuests.json')
			.then(function(response) {
				response.data.forEach(function(guest) {
					arrivingGuests.push(guest);
				});
			})
			.catch(function(error) {
				alert(error);
			});

			$rootScope.$on(EVENTS.new_guest,function(event,guest) {
				currentGuests.push(guest);
			});

			$rootScope.$on(EVENTS.remove_guest,function(event,guest) {
				for(var i = 0; i < currentGuests.length; i++) {
					if(currentGuests[i].id === guest.id) {
						currentGuests.splice(i,1);
					}
				}
			});

			var service = {
				getGuests: {
					currentGuests:currentGuests,
					arrivingGuests:arrivingGuests
				}
			};
			return service;
				////////////////////// define functions here.
			}
})();