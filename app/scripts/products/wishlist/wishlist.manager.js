(function () {
    'use strict';

    angular.module('app.products').factory('wishlistManager', wishlistManager);

    wishlistManager.$inject = ['$q', '$localStorage', 'Product'];

    function wishlistManager($q, $localStorage, Product) {
        var manager = {},
            $storage = $localStorage.$default({
                wishlist: []
            });

            // deserialize to Product model
            $storage.wishlist = $storage.wishlist.map(function (item) {
                return Product.build(item);
            });

        manager.findProducts = findProducts;
        manager.addProduct = addProduct;
        manager.removeProduct = removeProduct;
        manager.isFavorite = isFavorite;

        return manager;

        function findProducts() {
            return $q.when($storage.wishlist);
        }

        function addProduct(product) {
            var foundProduct = $storage.wishlist.filter(function (item) {
                return item.id === product.id;
            });

            if (!foundProduct.length) {
                $storage.wishlist.push(product);
            }
        }

        function removeProduct(productId) {
            var index = -1;
            for (var i = 0; i < $storage.wishlist.length; i++) {
                if ($storage.wishlist[i].id === productId) {
                    index = i;
                    break;
                }
            }

            if (index !== -1) {
                $storage.wishlist.splice(index, 1);
            }

            return index;
        }

        function isFavorite(product) {
            var foundProduct = $storage.wishlist.filter(function (item) {
                return item.id === product.id;
            });

            return !!foundProduct.length;
        }


    }

})();