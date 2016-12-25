(function () {

    'use strict';

    angular.module('app.categories').factory('shopifyCategoryAdapter', adapter);

    adapter.$inject = [];

    function adapter() {

        return {
            transform: function (destination, source) {                
                destination.title = source.title;      
                destination.collectionId = source.collection;                         
            }
        };       
    }

})();