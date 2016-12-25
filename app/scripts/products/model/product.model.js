(function () {

    'use strict';

    angular.module('app.products').factory('Product', prod);

    prod.$inject = ['ProductOption', 'Variant'];

    function prod(ProductOption, Variant) {

        function Product() {

        }

        Product.prototype = {

            get id() {
                return this._id;
            },
            set id(value) {
                this._id = value;
            },

            get title() {
                return this._title;
            },
            set title(value) {
                this._title = value;
            },

            get vendor() {
                return this._vendor;
            },
            set vendor(value) {
                this._vendor = value;
            },

            get image() {
                return this._image;
            },
            set image(value) {
                this._image = value;
            },

            get images() {
                return this._images;
            },
            set images(value) {
                this._images = value;
            },

            get options() {
                return this._options;
            },
            set options(value) {
                this._options = value;
            },

            get price() {
                return this._price;
            },
            set price(value) {
                this._price = value;
            },

            get salePrice() {
                return this._salePrice;
            },
            set salePrice(value) {
                this._salePrice = value;
            },

            get shortDescription() {
                return this._shortDescription;
            },
            set shortDescription(value) {
                this._shortDescription = value;
            },

            get variants() {
                return this._variants;
            },
            set variants(value) {
                this._variants = value;
            },

            get optionsLayoutState() {
                return this._optionsLayoutState;
            },
            set optionsLayoutState(value) {
                this._optionsLayoutState = value;
            },

            findVariantByOptions: function () {
                var self = this,
                    variant = this.variants.filter(function (variant) {
                        return variant.matches(self.options);
                    });

                return variant.length ? variant[0] : null;
            }
        };

        Product.build = function (source, adapter) {
            var product = new Product();
            if (adapter) {
                adapter.transform(product, source);
            } else {
                angular.extend(product, source);

              if (product && product.results) {
                product.variants = product.variants.map(function (variantSrc) {
                  return Variant.build(variantSrc);
                });

                product.options = product.options.map(function (optionSrc) {
                  return ProductOption.build(optionSrc);
                });
              }

                // convert raw variants to Variant objects
                // product.variants = product.variants.map(function (variantSrc) {
                //     return Variant.build(variantSrc);
                // });
                //
                // // convert raw variants to Variant objects
                // product.options = product.options.map(function (optionSrc) {
                //     return ProductOption.build(optionSrc);
                // });
            }

            return product;
        };

        return Product;
    }

})();
