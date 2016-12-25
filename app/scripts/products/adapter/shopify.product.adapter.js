(function () {

    'use strict';

    angular.module('app.products').factory('shopifyProductAdapter', adapter);

    adapter.$inject = ['Variant', 'ProductOption', 'shopifyVariantAdapter', 'shopifyProductOptionAdapter', 'PRODUCT_DEFAULT_VALUES', 'OPTION_TEMPLATE_STATES'];

    function adapter(Variant, ProductOption, variantAdapter, optionAdapter, PRODUCT_DEFAULT_VALUES, OPTION_TEMPLATE_STATES) {

        return {
            transform: function (destination, source) {
                destination.id = source.id;
                destination.title = source.title;
                destination.shortDescription = source.body_html;
                destination.vendor = source.vendor;
                destination.image = findImageForVariant(source, source.variants[0]);
                destination.price = source.variants[0].price;
                destination.salePrice = source.variants[0].compare_at_price;
                destination.images = source.images;

                destination.options = source.options.map(function (option) {
                    return ProductOption.build(option, optionAdapter);
                });

                destination.optionsLayoutState = getOptionsLayoutState(destination.options);

                destination.variants = source.variants.map(function (variant) {
                    var newVariant = Variant.build(variant, variantAdapter);
                    newVariant.options = mapOptions(variant, source.options);

                    return newVariant;
                });
            }
        };

        function findImageForVariant(product, variant) {
            var images = product.images,
                image = images.filter(function (img) {
                    return img.id === variant.image_id;
                });

            if (image.length) {
                image = image[0];
            } else {
                image = product.image;
            }

            return image ? image.src : '';
        }

        function mapOptions(variant, options) {
            var option,
                optionsMap = {};

            if (variant.option1) {
                option = findOptionByPosition(options, 1);
                optionsMap[option.id] = variant.option1;
            }

            if (variant.option2) {
                option = findOptionByPosition(options, 2);
                optionsMap[option.id] = variant.option2;
            }

            if (variant.option3) {
                option = findOptionByPosition(options, 3);
                optionsMap[option.id] = variant.option3;
            }

            return optionsMap;
        }

        function findOptionByPosition(options, position) {
            var option = options.filter(function (option) {
                return option.position === position;
            });

            return option.length ? option[0] : null;
        }

        function getOptionsLayoutState(options) {
            //Shopify related thing. If there is no options for certain item, Shopify will generate a default one with name "Title" and single value "Default Title". We don't need to show it.
            if (options.length === 1 && options[0].values.length === 1 && options[0].title === PRODUCT_DEFAULT_VALUES.DEFAULT_TITLE && options[0].values[0] === PRODUCT_DEFAULT_VALUES.DEFAULT_VALUE) {
                return OPTION_TEMPLATE_STATES.HIDE_ALL;
            } else {
                //If there is a single option without title Shopify will give it a name 'Title'. This will be rendered as options without name - just a drop down with values
                if (options.length === 1 && options[0].title === PRODUCT_DEFAULT_VALUES.DEFAULT_TITLE) {
                    return OPTION_TEMPLATE_STATES.SHOW_WITHOUT_TITLE;
                } else {
                    return OPTION_TEMPLATE_STATES.SHOW_ALL;
                }
            }
        }
    }
})();
