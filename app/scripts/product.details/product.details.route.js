(function () {
    'use strict';

    angular
        .module('app.product.details')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.product-details',
            config: {
                url: '/product/:productId/',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/product.details/product.details.html',
                        controller: 'ProductController',
                        controllerAs: 'productdetails'
                    }
                }
            }
        }];
    }

})();