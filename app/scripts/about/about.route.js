(function () {
    'use strict';

    angular
        .module('app.about')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.about',
            config: {
                url: '/about',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/about/about.html',
                        controller: 'AboutController',
                        controllerAs: 'about'
                    }
                }
            }
        }];
    }

})();
