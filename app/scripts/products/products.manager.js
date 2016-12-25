(function () {
    'use strict';

    angular.module('app.products').factory('productsManager', productsManager);

    productsManager.$inject = ['$http', '$translate', 'categoryManager', 'wishlistManager', 'shoppingCartManager','shopManager', 'productsService', 'SortOptions', 'AppContext', '$ionicScrollDelegate','$rootScope'];

    function productsManager($http, $translate, categoryManager, wishlistManager, cartManager,shopManager, productsService, SortOptions, AppContext, $ionicScrollDelegate,$rootScope) {


        var manager = {},
            LIST_VIEW = 'listview',
            GRID_VIEW = 'gridview',
            currentProduct,

            viewModelProperties = {
                productsWithCategories: {
                    pageTitle: $translate.instant('products.title'),
                    hasTabs: true,
                    allowRemoveProducts: false,
                    hasOptionBar: true,
                    noProductsText: $translate.instant('products.noProducts')
                },
                productsNoCategories: {
                    pageTitle: $translate.instant('products.title'),
                    hasTabs: false,
                    allowRemoveProducts: false,
                    hasOptionBar: true,
                    noProductsText: $translate.instant('products.noProducts')
                },
                searchResults: {
                    pageTitle: '=searchKey',
                    hasTabs: false,
                    allowRemoveProducts: false,
                    hasOptionBar: true,
                    noProductsText: $translate.instant('search.noProducts')
                },
                wishlist: {
                    pageTitle: $translate.instant('wishlist.title'),
                    hasTabs: false,
                    allowRemoveProducts: true,
                    hasOptionBar: false,
                    noProductsText: $translate.instant('wishlist.noProducts')
                }
            };


        if( ($rootScope.globalCurrency !== '') && ($rootScope.globalCurrency !== undefined)     ){
          manager.viewOptions = {
            viewMode: GRID_VIEW,
            sortOptions: SortOptions,
            sortOption: SortOptions[0],
            currency: $rootScope.globalCurrency,
            displayVendor: AppContext.DISPLAY_VENDOR
          };
        }
        else{
          manager.viewOptions = {
              viewMode: GRID_VIEW,
              sortOptions: SortOptions,
              sortOption: SortOptions[0],
              currency: shopManager.getShop().currency,
              displayVendor: AppContext.DISPLAY_VENDOR
          };
        }
        manager.toggleFavorite = toggleFavorite;
        manager.addToCart = addToCart;
        manager.initViewModel = initViewModel;
        manager.getNavigationLinks = getNavigationLinks;
        manager.findProducts = findProducts;
        manager.toggleViewMode = toggleViewMode;
        manager.getCurrentProduct = getCurrentProduct;
        manager.setCurrentProduct = setCurrentProduct;
        manager.isThisProductFavourite = isThisProductFavourite;
        manager.isFavorite = false;


        return manager;

        function getNavigationLinks(parentCategory) {
            var category = categoryManager.getCategoryById(parentCategory),
                subcategories;

            if (category) {
                subcategories = category.categories.concat();
                // subcategories.unshift({
                //     title: $translate.instant('products.all'),
                //     id: parentCategory
                // });
            }

            return subcategories;
        }

        /**
         * @param  {string}
         * @param  {Object} Map of search options
         * @return {[type]} Array of products
         */
        function findProducts(options) {
            return productsService.findProducts(options);
        }

        function toggleViewMode() {
            if (manager.viewOptions.viewMode === LIST_VIEW) {
                manager.viewOptions.viewMode = GRID_VIEW;
            } else {
                manager.viewOptions.viewMode = LIST_VIEW;
            }

            // scroll 1px up and down in order to trigger lazy image download but stay on the same scroll position
            $ionicScrollDelegate.scrollBy(0, 1, false);
            $ionicScrollDelegate.scrollBy(0, -1, false);
        }

        function initViewModel(vm, viewType) {
            _.extend(vm, viewModelProperties[viewType], function (objValue, srcValue) {
                if (typeof srcValue === 'string' && srcValue.charAt(0) === '=') {
                    return vm[srcValue.substring(1)];
                }
                else {
                    return srcValue;
                }
            });
        }

        function addToCart(variant, quantity) {
            quantity = quantity || 1;
            // manager.cart.push({
            //     variant: variant,
            //     quantity: quantity
            // });
            //
            // $http.post('https://sample-store-69.myshopify.com/cart/add.js', {
            //     quantity: quantity,
            //     id: variant.id
            // }).then(function (data) {
            //     console.dir(data);
            // }, function (err) {
            //     console.dir(err);
            // });

          cartManager.addProduct(variant.id, quantity).catch(function () {

          }).finally(function () {
            Console.log(DONE);
          });
        }

        function isThisProductFavourite(product) {
          // console.log('MUIOO==' + wishlistManager.isFavorite(product));
          return wishlistManager.isFavorite(product);
        }
      function toggleFavorite(product,isRe) {
        if (!isRe) {
          wishlistManager.removeProduct(product.id);
        } else {
          wishlistManager.addProduct(product);
        }
      }

        function setCurrentProduct(product) {
            currentProduct =  product;
        }

        function getCurrentProduct() {
            return currentProduct;
        }
    }

})();
