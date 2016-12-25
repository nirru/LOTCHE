(function () {

    'use strict';

    angular.module('app.products').factory('productsService', ProductsService);

    ProductsService.$inject = ['$http', '$q', 'AppContext', 'Product', 'categoryManager', 'shopifyProductAdapter'];

    function ProductsService($http, $q, AppContext, Product, categoryManager, productAdapter) {
              
        var sortOptionsMap = {
            'featured': '',
            'title_asc': 'title+asc',
            'title_desc': 'title+desc',
            'date_asc': 'created_at+desc'
        };
        
        return {
            getProductsForCategory: getProductsForCategory,
            findProducts: findProducts
        };
        
        function getProductsForCategory(categoryId) {
            return findProducts({
                category: categoryId
            });
        }
        
        function findProducts(options) {
            var categoryId = options.category,
                title = options.key || '',
                category = categoryManager.getCategoryById(categoryId),
                collectionId = category ? category.collectionId : '',                
                url = AppContext.API_HOST + '/getProductsForCollection/',                
                params = {
                    title: title,
                    collection_id: collectionId,
                    limit: options.pageSize,
                    page: options.page + 1,
                    order: options.sort ? sortOptionsMap[options.sort] : ''
                },
                httpTimeout = $q.defer(),
                promise;

            cleanParams(params);

            promise = $http.get(url, {
                params: params,
                timeout: httpTimeout.promise
            }).then(function (result) {
                return processProducts(result.data);
            }, function (e) {
                throw e;
            });
            
            promise.httpTimeout = httpTimeout;
            
            return promise;
        }

        function processProducts(data) {
            var products = data.products,
                newProducts = products.map(processProduct);

            return newProducts;
        }

        function processProduct(product) {
            var newProduct = Product.build(product, productAdapter);
            return newProduct;
        }

        function cleanParams(params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    //Now, object[key] is the current value
                    if (params[key] === null || params[key] === '') {
                        delete params[key];
                    }
                }
            }
        }
    }

})();