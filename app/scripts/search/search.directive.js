(function () {

	'use strict';

	angular.module('app.search').directive('searchButton', search);

	search.$inject = ['$timeout'];

	function search($timeout) {

		return {
            restrict: 'A',
            controller: 'SearchController',
            controllerAs: 'search',
            bindToController: true,
            link: function (scope, el, attrs, searchController) {
                el.bind('click', function () {
                    $timeout(searchController.showSearchPanel);
                    //searchController.showSearchPanel();
                });
            }
        };

	}

})();