(function () {

    'use strict';

    angular.module('app.shopping_cart').factory('shopifyCartItemAdapter', adapter);

    adapter.$inject = ['PRODUCT_DEFAULT_VALUES'];

    function adapter(PRODUCT_DEFAULT_VALUES) {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.product_title;
                destination.description = source.product_description;
                destination.price = source.price / 100;
                destination.sku = source.sku;
                destination.quantity = source.quantity;
                destination.image = source.image;
                destination.variantDescription = source.variant_options.filter(function (option) {
                    return option !== PRODUCT_DEFAULT_VALUES.DEFAULT_VALUE;
                }).join(', ');                
            }
        };     
    }

})();