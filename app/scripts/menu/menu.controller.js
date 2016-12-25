(function () {

    'use strict';

    angular.module('app.menu')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$state', 'shoppingCartManager'];
    
    function MenuController($state, shoppingCartManager) {
        var vm = this;

        shoppingCartManager.getCart().then(function (cart) {
            vm.cart = cart;
            vm.getItemCount = function () {
                var count = 0;
                cart.items.forEach(function (item) {
                    count += item.quantity;
                });

                return count;
            };
        });
    }
})();