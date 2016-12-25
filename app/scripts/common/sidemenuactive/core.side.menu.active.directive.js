(function () {

    'use strict';

    angular.module('common')
        .directive('sideMenuActive', enableSideMenu);

    function enableSideMenu() {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                scope.$on('$ionicView.afterEnter', function () {
                    scope.sideMenu.active = attrs.sideMenuActive === 'true' ? true : false;
                });
            }
        };
    }

})();