(function () {
    'use strict';

    angular
        .module('app.products')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.products',
            config: {
                url: '/products/:viewType/:categoryId/:hasChildCategories',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/products/products.html',
                        controller: 'ProductsController',
                        controllerAs: 'productlist'
                    }
                }
            }
        },
        {
            state: 'app.products_with_tabs',
            config: {
                url: '/products/:viewType/:categoryId/:hasChildCategories/:categories12',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/products/products.tabs.html',
                        controller: 'ProductsController',
                        controllerAs: 'productlist'
                    }
                }
            }
        }];
    }

})();
