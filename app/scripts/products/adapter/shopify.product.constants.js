(function () {

    'use strict';

    return angular.module('app.products')
        .constant('PRODUCT_DEFAULT_VALUES', {
            'DEFAULT_TITLE': 'Title',
            'DEFAULT_VALUE': 'Default Title'
        })
        .constant('INVENTORY_POLICY', {
            'DENY': 'deny',
            'CONTINUE': 'continue'
        })
        .constant('INVENTORY_MANAGEMENT', {
            'SHOPIFY': 'shopify',
            'BLANK': null
        });
})();