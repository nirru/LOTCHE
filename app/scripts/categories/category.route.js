(function () {
    'use strict';

    angular
        .module('app.categories')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.categories',
            config: {
                url: '/categories/:categoryId',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/categories/category.html',
                        controller: 'CategoryController',
                        controllerAs: 'category'
                    }
                }
            }
        }];
    }

})();