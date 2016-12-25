(function () {

    'use strict';

    angular.module('app.core').factory('shopAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.currency = source.shop.currency;
                destination.rawData = source.shop;
            }
        };       
    }

})();