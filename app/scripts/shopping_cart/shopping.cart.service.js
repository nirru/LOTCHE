(function () {

    'use strict';

    angular.module('app.shopping_cart').factory('shoppingCartService', ShoppingCartService);

    ShoppingCartService.$inject = ['$q', '$http', 'AppContext', 'Cart', 'CartItem', 'shopifyCartAdapter', 'iframePost'];

    function ShoppingCartService($q, $http, AppContext, Cart, CartItem, cartAdapter, iframePost) {

        var SHOPIFY_STORE_URL = 'https://' + AppContext.SHOP.rawData.domain,
            allowedStorePaths = ['/account/login', '/account/register'];

        return {
            getCart: getCart,
            addProduct: addProduct,
            removeItem: removeItem,
            changeItem: changeItem,
            requestCheckout: requestCheckout
        };

        function getCart() {
            return $http.get(SHOPIFY_STORE_URL + '/cart.js').then(function (result) {
                return Cart.build(result.data, cartAdapter);
            }, function (err) {
                throw err;
            });
        }

        function addProduct(productId, quantity) {
            return $http.post(SHOPIFY_STORE_URL + '/cart/add.js', {
                id: productId,
                quantity: quantity
            }).then(function (result) {
                return CartItem.build(result.data);
            }, function (err) {
                throw err;
            });
        }

        function removeItem(id) {
            return changeItem(id, 0);
        }

        function changeItem(id, quantity) {
            return $http.post(SHOPIFY_STORE_URL + '/cart/change.js', {
                id: id.toString(),
                quantity: quantity
            }).then(function (result) {
                return Cart.build(result.data, cartAdapter);
            }, function (err) {
                throw err;
            });
        }

        function requestCheckout() {
            return iframePost.post(SHOPIFY_STORE_URL + '/cart', {
                checkout: 'Check out'
            }).then(function (checkoutURL) {
                var deferred = $q.defer();
                var ref = cordova.InAppBrowser.open(checkoutURL, '_blank', 'location=no');
                
                ref.addEventListener('loadstop', onLoadStop);
                ref.addEventListener('exit', onExit);

                function onLoadStop(e) { 
                    var url = e.url;
                    if (url.indexOf(SHOPIFY_STORE_URL) !== -1 && !checkIfURLIsAllowed(url)) {
                        removeListeners();
                        getCart().then(function (cart) {
                            deferred.resolve(cart);
                        }, function () {
                            deferred.reject();
                        }).finally(function () {
                            ref.close();
                        });
                    }
                }

                function onExit() {
                    removeListeners();
                    getCart().then(function (cart) {
                        deferred.resolve(cart);
                    }, function () {
                        deferred.reject();
                    }).finally(function () {
                        ref.close();
                    });
                }

                function removeListeners() {
                    ref.removeEventListener('loadstop', onLoadStop);
                    ref.removeEventListener('exit', onExit);
                }
                
                return deferred.promise;
            });
        }

        /**
         * [checkIfURLIsAllowed checks whether the specified url contains path that is allowed during checkout]
         * @param  {[String]} url [URL to check ]
         * @return {[Boolean]} [true or false]
         */
        function checkIfURLIsAllowed(url) {
            var allowed = false;

            for (var i = 0; i < allowedStorePaths.length; i++) {
                if (url.indexOf(SHOPIFY_STORE_URL + allowedStorePaths[i]) !== -1) {
                    allowed = true;
                    break;
                }                
            }

            return allowed;
        }
    }

})();