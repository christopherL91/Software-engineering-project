(function() {
	'use strict';

	angular
		.module('portfolioApp.roomservice',['toastr'])
		.controller('roomserviceController',roomserviceController);

		roomserviceController.$inject = ['roomOrderService','streamService','token','EVENTS','toastr'];

		function roomserviceController(roomOrderService,streamService,token,EVENTS,toastr) {
			var vm = this;
			vm.orders = roomOrderService.orders;

            streamService.socket.on(EVENTS.remove_order,function(data) {
                var client_id = data.client_id;
                if(client_id !== token.client_id) {
                    roomOrderService.remove(data.order);
                    toastr.info('One order removed', 'Order done', {
                        extendedTimeOut: 0,
                        maxOpened: 5,
                        tapToDismiss: true,
                        timeOut: 0
                    });
                }
            });
		}
})();