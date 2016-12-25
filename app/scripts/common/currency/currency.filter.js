(function () {

    'use strict';

    angular.module('common').filter('currencyFormatter', currencyFormatter);

    currencyFormatter.$inject = ['CURRENCIES', '$sce'];

    function currencyFormatter(CURRENCIES, $sce) {

        var placeholderOptions = {
            amount: {
                thousandsSeparator: ',',
                decimalSeparator: '.',
                decimalDigits: 2
            },
            amount_no_decimals: {
                thousandsSeparator: ',',
                decimalSeparator: '.',
                decimalDigits: 0
            },
            amount_with_comma_separator: {
                thousandsSeparator: '.',
                decimalSeparator: ',',
                decimalDigits: 2
            },
            amount_no_decimals_with_comma_separator: {
                thousandsSeparator: '.',
                decimalSeparator: ',',
                decimalDigits: 0
            }
        };

        return function (amount, currency) {
            return $sce.trustAsHtml(formatCurrency(amount, currency));
        };

        function formatCurrency(amount, currency) {

            var format = currency && CURRENCIES[currency] && CURRENCIES[currency]['money_format'] || '{{amount}}',
                result;

            result = format.replace(/(\{\{\s*(\w+)\s*\}\})/, function replacePlaceholder() {
                var p2 = arguments[2],
                    options = placeholderOptions[p2],
                    result;

                if (options) {
                    result = formatWithDelimiters(amount, options);
                } else {
                    result = amount;
                }

                return result;
            });

            return result;
        }

        function formatWithDelimiters(amount, options) {
            var parts,
                dollars,
                cents;

            amount = parseFloat(amount);

            if (isNaN(amount) || amount === null) {
                return 0;
            }

            amount = amount.toFixed(options.decimalDigits);
            parts = amount.split('.');
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + options.thousandsSeparator);
            cents = parts[1] ? (options.decimalSeparator + parts[1]) : '';

            return dollars + cents;
        }
    }

})();