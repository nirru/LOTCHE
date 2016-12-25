(function () {

    'use strict';

    angular.module('app.product.details').factory('productDetailsManager', manager);

    manager.$inject = ['$sce', 'productsManager', 'wishlistManager', 'shoppingCartManager', 'shopManager','$rootScope'];

    function manager($sce, productsManager, wishlistManager, cartManager, shopManager, $rootScope) {

        var productDetailsCurrency = shopManager.getShop().currency;
        if(($rootScope.globalCurrency !== "") && ($rootScope.globalCurrency !== undefined)){
          productDetailsCurrency = $rootScope.globalCurrency;
        }

        var manager = {
                // data exposed to controller
                viewData: {
                    product: null,
                    variant: null,
                    isLoading: false,
                    addingProductToCart: false,
                    quantity: 1,
                    descriptionText: '',
                    isFavorite: false,
                    swiperOptions: null,
                    currency: productDetailsCurrency
                },
                init: init,
                incrementQuantity: incrementQuantity,
                decrementQuantity: decrementQuantity,
                addToCart: addToCart,
                handleOptionChange: handleOptionChange,
                toggleFavorite: toggleFavorite,
                isSoldOut: isSoldOut
            },
            product,
            variant,
            slider;

        // initialize view specific data
        function init() {
            storeProduct(productsManager.getCurrentProduct());
            storeVariant(product.variants[0]);
            manager.viewData.isLoading = false;
            manager.viewData.addingProductToCart = false;
            manager.viewData.quantity = 1;
            manager.viewData.descriptionText = $sce.trustAsHtml(product.shortDescription);
            manager.viewData.isFavorite = wishlistManager.isFavorite(product);
            manager.viewData.swiperOptions = getSwiperOptions();

            applyVariant(variant, product.options);
        }

        function storeProduct(newProduct) {
            product = manager.viewData.product = newProduct;
        }

        function storeVariant(newVariant) {
            variant = manager.viewData.variant = newVariant;
        }

        function getSwiperOptions() {
            var options = {};
            //There is no API in Swiper to hide pagination conditionally
            //Instead, set to "false" container with pagination via "pagination" parameter
            if (product.images.length < 2) {
                options.pagination = false;
            }
            options.onInit = function (s) {
                slider = s;
                handleOptionChange();
            };

            return options;
        }

        function applyVariant(variant, options) {
            if (variant && options) {
                options.forEach(function (option) {
                    option.selectedValue = variant.options[option.id];
                });
            }
        }

        function handleOptionChange() {
            storeVariant(manager.viewData.product.findVariantByOptions());
            adjustQuantity();

            // slide only if variant is present
            if (variant) {
                slideToImage(0);
            }
        }

        function slideToImage(index) {
            if (index !== -1 && product.images.length > 0) {
                slider.slideTo(index, 0);
            }
        }

        // Shopping cart related stuff: increment/decrement quantity, add to cart
        function incrementQuantity() {
            var quantity = manager.viewData.quantity;

            if ((quantity < variant.quantity) || !variant.hasQuantityLimit) {
                ++manager.viewData.quantity;
            }
        }

        function decrementQuantity() {
            var quantity = manager.viewData.quantity;

            if (quantity > 1) {
                return --manager.viewData.quantity;
            } else {
                return 1;
            }
        }

        function addToCart() {
            manager.viewData.addingProductToCart = true;
            cartManager.addProduct(variant.id, manager.viewData.quantity).catch(function () {

            }).finally(function () {
                manager.viewData.addingProductToCart = false;
            });
        }

        function adjustQuantity() {
            var newQuantity,
                currentQuantity = manager.viewData.quantity;

            //  if variant is sold out preserve currently selected quantity
            if (isSoldOut()) {
                newQuantity = currentQuantity;
            } else if (variant.quantity >= currentQuantity) {
                newQuantity = currentQuantity;
            } else {
                if (!variant.hasQuantityLimit) {
                    newQuantity = currentQuantity;
                } else {
                    newQuantity = 1;
                }
            }

            manager.viewData.quantity = newQuantity;
        }

        function getImageIndex() {
            // the first image is going to be the default one
            var index = 0,
                imageId;

            if (variant) {
                imageId = variant.imageId;
                for (var i = 0; i < product.images.length; i++) {
                    if (product.images[i].id === imageId) {
                        index = i;
                        break;
                    }
                }

                return index;
            }
        }

        function toggleFavorite() {
            var isFavorite = manager.viewData.isFavorite;

            if (isFavorite) {
                wishlistManager.removeProduct(product.id);
            } else {
                wishlistManager.addProduct(product);
            }

            manager.viewData.isFavorite = !isFavorite;

        }

        function isSoldOut() {
            return !variant || (!variant.quantity && variant.hasQuantityLimit);
        }

        return manager;
    }

})();
