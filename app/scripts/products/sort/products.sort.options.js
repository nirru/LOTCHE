(function () {

    'use strict';

    angular.module('app.products').constant('SortOptions', [
    // {
    //     id: 'featured',
    //     label: 'products.sortFeatured'
    // },
    // {
    //     id: 'title_asc',
    //     label: 'products.sortAZ'
    // },
    // {
    //     id: 'title_desc',
    //     label: 'products.sortZA'
    // },
    {
        id: 'date_asc',
        label: 'products.sortNewest'
    }]);

})();
