(function () {

	'use strict';

	angular.module('app.search').controller('SearchController', SearchController);

	SearchController.$inject = ['$scope', '$state', '$translate', '$ionicSearchPanel'];

	function SearchController($scope, $state, $translate, $ionicSearchPanel) {

		var vm = this;

		vm.showSearchPanel = showSearchPanel;

		function showSearchPanel() {
            $ionicSearchPanel.show({
                submit: onSubmit,
                cancelText: $translate.instant('search.cancel'),
                placeholderText: $translate.instant('search.placeholder')
            });
        }        

        function onSubmit(key) {
            if (key) {
                // if we are already on search results page, load the product right away
                if ($state.current.name === 'app.results') {                    
                    $scope.$emit('search.submit', key);
                }
                else {
                    // otherwise navigate to search results page
                    $state.go('app.results', {
                        viewType: 'searchResults',
                        searchKey: key
                    });
                }                
            }            
        } 

	}

})();