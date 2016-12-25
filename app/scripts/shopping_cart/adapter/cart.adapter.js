(function () {

    'use strict';

    angular.module('app.shopping_cart').factory('shopifyCartAdapter', adapter);

    adapter.$inject = ['CartItem', 'shopifyCartItemAdapter'];

    function adapter(CartItem, cartItemAdapter) {

        return {
            transform: function (destination, source) {
                destination.id = source.token;
                destination.total = source.total_price / 100;                

                destination.items = source.items.map(function (cartItem) { 
                	return CartItem.build(cartItem, cartItemAdapter);
                });                 
            }
        };       
    }

})();