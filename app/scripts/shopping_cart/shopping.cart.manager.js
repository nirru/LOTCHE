(function () {

    'use strict';

    angular.module('app.shopping_cart').factory('shoppingCartManager', ShoppingCartMananger);

    ShoppingCartMananger.$inject = ['$q', '$translate', 'Cart', 'shoppingCartService', 'connectivity'];

    function ShoppingCartMananger($q, $translate, Cart, shoppingCartService, connectivity) {

        var cart = null,
            cartLoaderPromise,
            manager = {
                getCart: getCart,
                loadCart: loadCart,
                addProduct: addProduct,
                removeItem: removeItem,
                changeItem: changeItem,
                gotoCheckout: gotoCheckout
            };

        return manager;

        function getCart() {
            if (cartLoaderPromise) {
                return cartLoaderPromise;
            } else if (!cart) {
                cartLoaderPromise = loadCart();
                return cartLoaderPromise;
            } else {
                return $q.when(cart);
            }
        }

        function loadCart() {
            return shoppingCartService.getCart().then(receiveNewCart);
        }
                                                                                                              
        function addProduct(productId, quantity) {
      
            return shoppingCartService.addProduct(productId, quantity).then(loadCart, handleError);
        }
        
        function removeItem(id) {
            return shoppingCartService.removeItem(id).then(receiveNewCart, handleError);
        }

        function changeItem(id, quantity) {
            return shoppingCartService.changeItem(id, quantity).then(receiveNewCart, handleError);
        }

        function gotoCheckout() {
            return shoppingCartService.requestCheckout().then(receiveNewCart, handleError);
        }

        function receiveNewCart(newCart) {
            if (!cart) {
                cart = newCart;
                cartLoaderPromise = null;
            } else {
                angular.extend(cart, newCart);
            }

            return cart;
        }
        
        function handleError(e) {

            connectivity.showError($translate.instant('error.operationError'));
            throw e;
        }
    }

})();