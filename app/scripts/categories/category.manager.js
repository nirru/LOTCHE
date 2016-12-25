(function () {

    'use strict';

    angular.module('app.categories')
        .factory('categoryManager', CategoryManager);

    CategoryManager.$inject = ['$q', 'categoryService'];


    function CategoryManager($q, categoryService) {

        var navCategories = [],
            freeCategories = [],
            categoriesLoaded = false;

        return {
            loadNavCategories: loadNavCategories,
            getNavCategories: getNavCategories,
            addFreeCategory: addFreeCategory,
            getCategoryById: getCategoryById,
            getCategoryNavigationOptions: getCategoryNavigationOptions
        };

        function loadNavCategories() {
            return categoryService.getCategories().then(function (newCategories) {
                navCategories = newCategories;
                categoriesLoaded = true;
                return navCategories;
            });
        }

        function getNavCategories() {
            if (categoriesLoaded) {
                return $q.when(navCategories);
            }
            else {
                return loadNavCategories();
            }

        }

        function addFreeCategory(category) {
            freeCategories.push(category);

            return category;
        }

        function getCategoryById(categoryId) {
            var category,
                currentCategories = navCategories.concat(freeCategories);

            if (typeof arguments[1] !== 'undefined') {
                currentCategories = arguments[1];
            }

            for (var i = 0; i < currentCategories.length; i++) {
                category = currentCategories[i];
                if (category.id === categoryId) {
                    return category;
                }
            }
            for (i = 0; i < currentCategories.length; i++) {
                category = getCategoryById(categoryId, currentCategories[i].categories);
                if (category) {
                    return category;
                }
            }

            return null;
        }

        function getCategoryNavigationOptions(category) {
            var childCategories = category.categories,
                childCategory,
                showProducts = true,
                hasChildCategories = true,
                options = {};

            // if child there are no subcategories we should show products
            if (childCategories.length) {
                for (var i = 0; i < childCategories.length; i++) {
                    childCategory = childCategories[i];

                    // if at least one child category has subcategories we should not show products
                    if (childCategory.categories.length !== 0) {
                        showProducts = false;
                    }
                }
            } else {
                hasChildCategories = false;
            }

            if (showProducts) {
                if (hasChildCategories) {
                    options.url = 'app.products_with_tabs';
                }
                else {
                    options.url = 'app.products';
                }

            } else {
                options.url = 'app.categories';
            }

            options.viewType = hasChildCategories ? 'productsWithCategories': 'productsNoCategories';

            return options;
        }
    }

})();
