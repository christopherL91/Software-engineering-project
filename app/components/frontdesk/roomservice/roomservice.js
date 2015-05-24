(function() {
    'use strict';

    angular
        .module('portfolioApp.roomservice',['toastr'])
        .controller('roomserviceController',roomserviceController);

    roomserviceController.$inject = ['ordersPrepService','roomOrderService','streamService','EVENTS','toastr'];

    function roomserviceController(ordersPrepService,roomOrderService,streamService,EVENTS,toastr) {
        var vm = this;
        vm.orders = ordersPrepService.orders;

        streamService.socket.on(EVENTS.remove_order, function(data) {
            roomOrderService.remove(data.order);
            toastr.info('One order removed', 'Order done', {
                extendedTimeOut: 0,
                maxOpened: 5,
                tapToDismiss: true,
                timeOut: 0
            });
        });
    }
})();