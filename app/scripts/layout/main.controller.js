(function () {

    'use strict';

    angular.module('app.layout')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope'];

    function MainController($scope) {
        $scope.menu = {
            name: 'Menu',
            url: 'app/scripts/menu/menu.html'
        };
        $scope.sideMenu = {
            active: false
        };

    }
})();
