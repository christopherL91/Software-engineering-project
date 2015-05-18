(function() {
    "use strict";
    angular
        .module('portfolioApp.bugreport',[])
        .controller('bugController',bugController);

    bugController.$inject = ['$scope'];

    function bugController($scope) {
        var vm = this;

        vm.sendReport = function() {
            console.log(vm.message);
            $scope.closeThisDialog();
        };
    }
})();