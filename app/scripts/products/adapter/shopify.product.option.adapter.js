(function () {

    'use strict';

    angular.module('app.products').factory('shopifyProductOptionAdapter', adapter);

    function adapter() {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.name;
                destination.values = source.values;               
            }
        };
    }

})();