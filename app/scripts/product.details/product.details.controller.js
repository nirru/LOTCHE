(function () {
    'use strict';

    angular.module('app.product.details').controller('ProductController', ProductController);

    ProductController.$inject = ['productDetailsManager','$rootScope','$ionicSlideBoxDelegate'];

    function ProductController(detailsManager, $rootScope,$ionicSlideBoxDelegate) {

        var vm = this;

        // init data
        detailsManager.init();

        // bind data to scope
        vm.viewData = detailsManager.viewData;

        // methods
        vm.text= 'Free Shipping to Jordan';
        vm.addToCart = detailsManager.addToCart;
        vm.incrementQuantity = detailsManager.incrementQuantity;
        vm.decrementQuantity = detailsManager.decrementQuantity;
        vm.toggleFavorite = detailsManager.toggleFavorite;
        vm.optionChanged = detailsManager.handleOptionChange;
        vm.isSoldOut = detailsManager.isSoldOut;


        if( ($rootScope.globalCountry !== '') && ($rootScope.globalCountry !== undefined)){
          vm.globalCountry = $rootScope.globalCountry;
          if (vm.globalCountry==vm.text){
            vm.globalCountry = vm.globalCountry + '16-30 Days';
          }else{
            vm.globalCountry = vm.globalCountry + '14-25 Days';
          }

        }

    }

})();
