(function () {

    'use strict';

    angular.module('app.shopping_cart').controller('ShoppingCartController', ShoppingCartController);

    ShoppingCartController.$inject = ['$scope', '$translate', '$stateParams', '$timeout', 'shoppingCartManager', 'shopManager','$rootScope'];

    function ShoppingCartController($scope, $translate, $stateParams, $timeout, shoppingCartManager, shopManager, $rootScope) {

        var vm = this;
        
        var currencyCart = '';
        if( ($rootScope.globalCurrency !== '') && ($rootScope.globalCurrency !== undefined)   ){
          vm.currency = $rootScope.globalCurrency;
        }
        else{
          vm.currency = shopManager.getShop().currency;
        }
        
        // properties
        vm.items = [];
        vm.cartLoading = false;        
        vm.updatingItemId = null;
        vm.deletingItemId = null;
        vm.showSpinner = false;
        vm.checkingOut = false;   
        vm.hasCart = false;
        vm.emptyCartMessage = $translate.instant('cart.noProducts');
        
        // methods        
        vm.hasSalePrice = hasSalePrice;
        vm.incrementItem = incrementItem;
        vm.decrementItem = decrementItem;
        vm.removeItem = removeItem;
        vm.gotoCheckout = gotoCheckout;        

        $scope.$on('$ionicView.afterEnter', function () {            
            vm.cartRequest = loadCart();
        });

        function loadCart() {
            vm.showSpinner = true;
            return shoppingCartManager.loadCart().then(function (cart) {
                return applyCart(cart);
            }).finally(function () {
                vm.showSpinner = false;
            });
        }

        function hasSalePrice(item) {
            return item.hasOwnProperty('salePrice');
        }

        function incrementItem(item) {
            var timeout = $timeout(function () {
                vm.updatingItemId = item.id;
            }, 500);

            shoppingCartManager.changeItem(item.id, item.quantity + 1).then(function (cart) {
                applyCart(cart);
            }).finally(function () {
                if (vm.updatingItemId) {
                    $timeout(function () {
                        vm.updatingItemId = null;
                    }, 1000);
                } else {
                    $timeout.cancel(timeout);
                }
            });
        }

        function decrementItem(item) {
            var timeout = $timeout(function () {
                vm.updatingItemId = item.id;
            }, 500);

            shoppingCartManager.changeItem(item.id, item.quantity - 1).then(function (cart) {
                applyCart(cart);
            }).finally(function () {
                if (vm.updatingItemId) {
                    $timeout(function () {
                        vm.updatingItemId = null;
                    }, 1000);
                } else {
                    $timeout.cancel(timeout);
                }
            });
        }
        
        function removeItem(item) {
            if (!vm.deletingItemId) {
                vm.deletingItemId = item.id;
                shoppingCartManager.removeItem(item.id).then(function (cart) {
                    applyCart(cart);
                }).finally(function () {
                    vm.deletingItemId = null;
                });
            }
        }
        
        function gotoCheckout() {
            vm.checkingOut = true;          
            shoppingCartManager.gotoCheckout().then(function (cart) {
                applyCart(cart);
            }).finally(function () {
                vm.checkingOut = false;
            });
        }
      
        function applyCart(cart) {
          
            if (cart && cart.id && cart.items.length) {   
                vm.hasCart = true;             
                vm.items = cart.items;
                vm.total = cart.total;
                
                if(  (($rootScope.globalCurrencyChangeRate !== undefined) && ($rootScope.globalCurrencyChangeRate !== '')) && (($rootScope.globalCurrency !== undefined) && ($rootScope.globalCurrency !== '')) ){
                  
                  cart.items.forEach(function(itm){

                    itm['price'] = parseFloat(itm['price']).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);
                  });
                  
                  vm.total = parseFloat(cart.total).toFixed(2) * parseFloat($rootScope.globalCurrencyChangeRate).toFixed(2);
                }
            } else {      
                vm.hasCart = false;          
                vm.items.length = 0;
                vm.cartRequest = vm.items;
            }
            
            return vm.items;
        }
    }

})();