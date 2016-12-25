(function () {

    'use strict';

    angular.module('app.products').factory('shopifyVariantAdapter', adapter);

    adapter.$inject = ['INVENTORY_POLICY', 'INVENTORY_MANAGEMENT'];

    function adapter(INVENTORY_POLICY, INVENTORY_MANAGEMENT) {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.title;
                destination.vendor = source.vendor;
                destination.imageId = source.image_id;
                destination.price = source.price;
                destination.salePrice = source.compare_at_price;
                destination.sku = source.sku;
                destination.productId = source.product_id;      
                destination.quantity = source.inventory_quantity;
                destination.hasQuantityLimit = (source.inventory_management === INVENTORY_MANAGEMENT.SHOPIFY) && (source.inventory_policy === INVENTORY_POLICY.DENY);
            }
        };
    }

})();