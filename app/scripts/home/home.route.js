(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'bootstrap'];

    function appRun(routerHelper, bootstrap) {
        routerHelper.configureStates(getStates(), '/app/home');

        function getStates() {
            return [{
                state: 'app.home',
                config: {
                    url: '/home',
                    cache: true,
                    views: {
                        'viewContent': {
                            templateUrl: 'app/scripts/home/home.html',
                            controller: 'HomeController',
                            controllerAs: 'home'
                        }
                    },
                    resolve: {
                        bootstrap: bootstrap.start
                    }
                }
            }];
        }
    }



})();
