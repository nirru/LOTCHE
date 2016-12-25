(function () {

    'use strict';

    angular.module('app.core').factory('shopManager', shopManager);

    shopManager.$inject = ['shopService', 'AppContext'];

    function shopManager(shopService, AppContext) {

        var shop;           

        return {
            getShop: getShop,
            loadShopData: loadShopData            
        };

        function getShop() {
            return shop;
        }

        function loadShopData() {
            return shopService.getShopData().then(function (s) {
                shop = s;
                AppContext.SHOP = shop;
                return s;
            });
        }        
    }



})();