(function () {

    'use strict';

    angular.module('app.categories')
        .factory('categoryService', CategoryService);

    CategoryService.$inject = ['$q', '$http', 'AppContext', 'Category', 'shopifyCategoryAdapter'];


    function CategoryService($q, $http, AppContext, Category, categoryAdapter) {

        return {
            getCategories: getCategories,
            getCategoryDetails: getCategoryDetails
        };

        function getCategories() {
            var url = AppContext.API_HOST + '/getNavigationLinks';

            return $http.get(url).then(function (result) {
                var tree = buildCategoryTree(result.data, AppContext.ROOT_CATEGORY);
                generateIds(tree);
                return tree;
            });
        }

        function getCategoryDetails(categoryId) {
            var url = AppContext.API_HOST + '/getCollection';

            return $http.get(url, {
                params: {
                    collectionId: categoryId
                }
            }).then(function (result) {
                return result.data;
            });
        }

        function buildCategoryTree(links, rootCategory) {
            var tree = [];
            links.forEach(function (link) {
                var category;
                if (link.parent === rootCategory) {
                    category = Category.build(link, categoryAdapter);
                    tree.push(category);
                    category.categories = buildCategoryTree(links, link.handle);
                }
            });

            return tree;
        }

        function generateIds(categories) {
            var idObj = {
                id: 1
            };
            _generateIds(categories, idObj);
        }

        function _generateIds(categories, idObj) {
            categories.forEach(function (category) {
                category.id = (idObj.id++).toString();
                _generateIds(category.categories, idObj);
            });
        }
    }

})();