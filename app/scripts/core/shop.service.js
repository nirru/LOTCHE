(function () {

    'use strict';

    angular.module('app.core').factory('shopService', shopService);

    shopService.$inject = ['$http', 'AppContext', 'Shop', 'shopAdapter'];

    function shopService($http, AppContext, Shop, shopAdapter) {

        return {
            getShopData: getShopData
        };

        function getShopData() {
            var url = AppContext.API_HOST + '/getShopData';

            return $http.get(url).then(function (result) {
            	return Shop.build(result.data, shopAdapter);
            });
        }

    }

})();