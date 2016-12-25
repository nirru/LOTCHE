(function () {

    'use strict'; 

    /*jshint ignore:start*/

    angular.module('common').constant('CURRENCIES', {
        'USD': {
            'money_format': '${{amount}}'
        },
        'EUR': {
            'money_format': '&euro;{{amount}}'
        },
        'GBP': {
            'money_format': '&pound;{{amount}}'
        },
        'CAD': {
            'money_format': '${{amount}}'
        },
        'ALL': {
            'money_format': 'Lek {{amount}}'
        },
        'DZD': {
            'money_format': 'DA {{amount}}'
        },
        'AOA': {
            'money_format': 'Kz{{amount}}'
        },
        'ARS': {
            'money_format': '${{amount_with_comma_separator}}'
        },
        'AMD': {
            'money_format': '{{amount}} AMD'
        },
        'AWG': {
            'money_format': 'Afl{{amount}}'
        },
        'AUD': {
            'money_format': '${{amount}}'
        },
        'BBD': {
            'money_format': '${{amount}}'
        },
        'AZN': {
            'money_format': 'm.{{amount}}'
        },
        'BDT': {
            'money_format': 'Tk {{amount}}'
        },
        'BSD': {
            'money_format': 'BS${{amount}}'
        },
        'BHD': {
            'money_format': '{{amount}}0 BD'
        },
        'BYR': {
            'money_format': 'Br {{amount}}'
        },
        'BZD': {
            'money_format': 'BZ${{amount}}'
        },
        'BTN': {
            'money_format': 'Nu {{amount}}'
        },
        'BAM': {
            'money_format': 'KM {{amount_with_comma_separator}}'
        },
        'BRL': {
            'money_format': 'R$ {{amount_with_comma_separator}}'
        },
        'BOB': {
            'money_format': 'Bs{{amount_with_comma_separator}}'
        },
        'BWP': {
            'money_format': 'P{{amount}}'
        },
        'BND': {
            'money_format': '${{amount}}'
        },
        'BGN': {
            'money_format': '{{amount}} лв'
        },
        'MMK': {
            'money_format': 'K{{amount}}'
        },
        'KHR': {
            'money_format': 'KHR{{amount}}'
        },
        'KYD': {
            'money_format': '${{amount}}'
        },
        'XAF': {
            'money_format': 'FCFA{{amount}}'
        },
        'CLP': {
            'money_format': '${{amount_no_decimals}}'
        },
        'CNY': {
            'money_format': '&#165;{{amount}}'
        },
        'COP': {
            'money_format': '${{amount_with_comma_separator}}'
        },
        'CRC': {
            'money_format': '&#8353; {{amount_with_comma_separator}}'
        },
        'HRK': {
            'money_format': '{{amount_with_comma_separator}} kn'
        },
        'CZK': {
            'money_format': '{{amount_with_comma_separator}} K&#269;'
        },
        'DKK': {
            'money_format': '{{amount_with_comma_separator}}'
        },
        'DOP': {
            'money_format': 'RD$ {{amount}}'
        },
        'XCD': {
            'money_format': '${{amount}}'
        },
        'EGP': {
            'money_format': 'LE {{amount}}'
        },
        'ETB': {
            'money_format': 'Br{{amount}}'
        },
        'XPF': {
            'money_format': '{{amount_no_decimals_with_comma_separator}} XPF'
        },
        'FJD': {
            'money_format': '${{amount}}'
        },
        'GMD': {
            'money_format': 'D {{amount}}'
        },
        'GHS': {
            'money_format': 'GH&#8373;{{amount}}'
        },
        'GTQ': {
            'money_format': 'Q{{amount}}'
        },
        'GYD': {
            'money_format': 'G${{amount}}'
        },
        'GEL': {
            'money_format': '{{amount}} GEL'
        },
        'HNL': {
            'money_format': 'L {{amount}}'
        },
        'HKD': {
            'money_format': '${{amount}}'
        },
        'HUF': {
            'money_format': '{{amount_no_decimals_with_comma_separator}}'
        },
        'ISK': {
            'money_format': '{{amount_no_decimals}} kr'
        },
        'INR': {
            'money_format': 'Rs. {{amount}}'
        },
        'IDR': {
            'money_format': '{{amount_with_comma_separator}}'
        },
        'ILS': {
            'money_format': '{{amount}} NIS'
        },
        'JMD': {
            'money_format': '${{amount}}'
        },
        'JPY': {
            'money_format': '&#165;{{amount_no_decimals}}'
        },
        'JEP': {
            'money_format': '&pound;{{amount}}'
        },
        'JOD': {
            'money_format': '{{amount}}0 JD'
        },
        'KZT': {
            'money_format': '{{amount}} KZT'
        },
        'KES': {
            'money_format': 'KSh{{amount}}'
        },
        'KWD': {
            'money_format': '{{amount}}0 KD'
        },
        'KGS': {
            'money_format': 'лв{{amount}}'
        },
        'LVL': {
            'money_format': 'Ls {{amount}}'
        },
        'LBP': {
            'money_format': 'L&pound;{{amount}}'
        },
        'LTL': {
            'money_format': '{{amount}} Lt'
        },
        'MGA': {
            'money_format': 'Ar {{amount}}'
        },
        'MKD': {
            'money_format': 'ден {{amount}}'
        },
        'MOP': {
            'money_format': 'MOP${{amount}}'
        },
        'MVR': {
            'money_format': 'Rf{{amount}}'
        },
        'MXN': {
            'money_format': '$ {{amount}}'
        },
        'MYR': {
            'money_format': 'RM{{amount}} MYR'
        },
        'MUR': {
            'money_format': 'Rs {{amount}}'
        },
        'MDL': {
            'money_format': '{{amount}} MDL'
        },
        'MAD': {
            'money_format': '{{amount}} dh'
        },
        'MNT': {
            'money_format': '{{amount_no_decimals}} &#8366'
        },
        'MZN': {
            'money_format': '{{amount}} Mt'
        },
        'NAD': {
            'money_format': 'N${{amount}}'
        },
        'NPR': {
            'money_format': 'Rs{{amount}}'
        },
        'ANG': {
            'money_format': '&fnof;{{amount}}'
        },
        'NZD': {
            'money_format': '${{amount}}'
        },
        'NIO': {
            'money_format': 'C${{amount}}'
        },
        'NGN': {
            'money_format': '&#8358;{{amount}}'
        },
        'NOK': {
            'money_format': 'kr {{amount_with_comma_separator}}'
        },
        'OMR': {
            'money_format': '{{amount_with_comma_separator}} OMR'
        },
        'PKR': {
            'money_format': 'Rs.{{amount}}'
        },
        'PGK': {
            'money_format': 'K {{amount}}'
        },
        'PYG': {
            'money_format': 'Gs. {{amount_no_decimals_with_comma_separator}}'
        },
        'PEN': {
            'money_format': 'S/. {{amount}}'
        },
        'PHP': {
            'money_format': '&#8369;{{amount}}'
        },
        'PLN': {
            'money_format': '{{amount_with_comma_separator}} zl'
        },
        'QAR': {
            'money_format': 'QAR {{amount_with_comma_separator}}'
        },
        'RON': {
            'money_format': '{{amount_with_comma_separator}} lei'
        },
        'RUB': {
            'money_format': '&#1088;&#1091;&#1073;{{amount_with_comma_separator}}'
        },
        'RWF': {
            'money_format': '{{amount_no_decimals}} RF'
        },
        'WST': {
            'money_format': 'WS$ {{amount}}'
        },
        'SAR': {
            'money_format': '{{amount}} SR'
        },
        'STD': {
            'money_format': 'Db {{amount}}'
        },
        'RSD': {
            'money_format': '{{amount}} RSD'
        },
        'SCR': {
            'money_format': 'Rs {{amount}}'
        },
        'SGD': {
            'money_format': '${{amount}}'
        },
        'SYP': {
            'money_format': 'S&pound;{{amount}}'
        },
        'ZAR': {
            'money_format': 'R {{amount}}'
        },
        'KRW': {
            'money_format': '&#8361;{{amount_no_decimals}}'
        },
        'LKR': {
            'money_format': 'Rs {{amount}}'
        },
        'SEK': {
            'money_format': '{{amount_no_decimals}} kr'
        },
        'CHF': {
            'money_format': 'SFr. {{amount}}'
        },
        'TWD': {
            'money_format': '${{amount}}'
        },
        'THB': {
            'money_format': '{{amount}} &#xe3f;'
        },
        'TZS': {
            'money_format': '{{amount}} TZS'
        },
        'TTD': {
            'money_format': '${{amount}}'
        },
        'TND': {
            'money_format': '{{amount}}'
        },
        'TRY': {
            'money_format': '{{amount}}TL'
        },
        'UGX': {
            'money_format': 'Ush {{amount_no_decimals}}'
        },
        'UAH': {
            'money_format': '₴{{amount}}'
        },
        'AED': {
            'money_format': 'Dhs. {{amount}}'
        },
        'UYU': {
            'money_format': '${{amount_with_comma_separator}}'
        },
        'VUV': {
            'money_format': '${{amount}}'
        },
        'VEF': {
            'money_format': 'Bs. {{amount_with_comma_separator}}'
        },
        'VND': {
            'money_format': '{{amount_no_decimals_with_comma_separator}}&#8363;'
        },
        'XBT': {
            'money_format': '{{amount_no_decimals}} BTC'
        },
        'XOF': {
            'money_format': 'CFA{{amount}}'
        },
        'ZMW': {
            'money_format': 'K{{amount_no_decimals_with_comma_separator}}'
        }
    }); 

/*jshint ignore:end*/

})();