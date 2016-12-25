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
            state: 'app.wishlist',
            config: {
                url: '/products/:viewType',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/products/products.html',
                        controller: 'WishlistController',
                        controllerAs: 'productlist'
                    }
                }
            }
        }];
    }

})();