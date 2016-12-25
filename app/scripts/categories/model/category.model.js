(function () {

    'use strict';

    angular.module('app.categories').factory('Category', category);

    function category() {

        function Category() {

        }

        Category.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                if (value) {
                    this._id = value.toString();
                }
                else {
                    this._id = null;
                }                
            },
            get title() {
                return this._title;
            },
            set title(value) {
                this._title = value;
            },
            get collectionId() {
                return this._collectionId;
            },
            set collectionId(value) {
                if (value) {
                    this._collectionId = value.toString();
                }
                else {
                    this._collectionId = null;
                }                
            },
            get categories() {
                return this._categories;
            },
            set categories(value) {
                this._categories = value;
            }
        };

        Category.build = function (source, adapter) {
            var category = new Category();
            if (adapter) {
                adapter.transform(category, source);
            } else {
                angular.extend(category, source);
            }

            return category;
        };

        return Category;
    }

})();