(function () {

    'use strict';

    angular.module('app.categories').controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', '$stateParams', '$state', 'categoryManager'];

    function CategoryController($scope, $stateParams, $state, categoryManager) {
        var vm = this,
            categoryId = $stateParams.categoryId;

        vm.navigateToCategory = navigateToCategory;
        vm.current = categoryManager.getCategoryById(categoryId);        

        $scope.$on('$ionicView.afterEnter', function (event, transition) {            
            if (transition.direction !== 'back') {
                if (vm.current) {
                    vm.items = vm.current.categories;
                }
            }
        });

        function navigateToCategory(category) {
            var options = categoryManager.getCategoryNavigationOptions(category);

            $state.go(options.url, {
                categoryId: category.id,
                viewType: options.viewType
            });
        }
    }

})();