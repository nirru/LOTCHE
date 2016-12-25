(function () {

    'use strict';

    angular.module('app.core').factory('Shop', shop);

    function shop() {

        function Shop() {}

        Shop.prototype = {

            get currency() {
                return this._currency;
            },
            set currency(value) {
                this._currency = value;
            },
            get rawData() {
                return this._rawData;
            },
            set rawData(value) {
                this._rawData = value;
            }
        };

        Shop.build = function (source, adapter) {
            var shop = new Shop();
            if (adapter) {
                adapter.transform(shop, source);
            } else {
                angular.extend(shop, source);
            }

            return shop;
        };

        return Shop;
    }

})();