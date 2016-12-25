(function () {
    'use strict';

    angular
        .module('app.shopping_cart')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.shopping_cart',
            config: {
                url: '/shopping_cart',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'app/scripts/shopping_cart/shopping.cart.html',
                        controller: 'ShoppingCartController',
                        controllerAs: 'cart'
                    }
                }
            }
        }];
    }

})();