(function () {

    'use strict';

    return angular.module('app.products')
        .constant('OPTION_TEMPLATE_STATES', {
            'HIDE_ALL': 'HIDE_ALL',
            'SHOW_ALL': 'SHOW_ALL',
            'SHOW_WITHOUT_TITLE': 'SHOW_WITHOUT_TITLE'
        });
})();