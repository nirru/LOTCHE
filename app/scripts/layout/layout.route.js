(function () {
    'use strict';

    angular
        .module('app.layout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [

            {
                state: 'app',
                config: {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'app/scripts/layout/main.html',
                    controller: 'MainController'
                }
            }
        ];
    }
})();
