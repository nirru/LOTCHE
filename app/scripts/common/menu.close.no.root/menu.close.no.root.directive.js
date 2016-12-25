(function () {

    'use strict';

    angular.module('common')
        .directive('menuCloseNoRoot', menuCloseNoRoot);

    menuCloseNoRoot.$inject = ['$ionicHistory'];

    function menuCloseNoRoot($ionicHistory) {
        return {
            restrict: 'AC',
            link: function ($scope, $element, attrs) {
                var root = $scope.$eval(attrs.menuCloseNoRoot);

                $element.bind('click', function () {
                    var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
                    if (sideMenuCtrl) {

                        if (!root) {
                            $ionicHistory.nextViewOptions({
                                historyRoot: false,
                                disableAnimate: true,
                                expire: 300
                            });
                        }

                        sideMenuCtrl.close();
                    }
                });
            }
        };
    }
})();