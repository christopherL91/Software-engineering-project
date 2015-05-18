(function() {
    "use strict";
    angular
        .module('portfolioApp.bugreport',[])
        .controller('bugController',bugController);

    bugController.$inject = ['$scope','toastr'];

    function bugController($scope,toastr) {
        var vm = this;

        vm.sendReport = function() {
            console.log(vm.message);
            toastr.info('We will look through your bug report and we will get back to you ASAP', ' Thank you', {
                extendedTimeOut: 0,
                maxOpened: 5,
                tapToDismiss: true,
                timeOut: 0
            });
            $scope.closeThisDialog();
        };

        vm.close = function() {
            $scope.closeThisDialog();
        }
    }
})();