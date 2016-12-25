(function () {

	'use strict';

	angular.module('app.shopping_cart').directive('cartButton', cartButton);

	cartButton.$inject = ['shoppingCartManager'];

	function cartButton(shoppingCartManager) {
		return {
            restrict: 'A',
            template: '<div class="round-badge cart-badge" ng-if="cart.items.length > 0">{{getItemCount()}}</div>',
            link: function (scope) {
                shoppingCartManager.getCart().then(function (cart) {
                    scope.cart = cart;
                    scope.getItemCount = function () {
                        var count = 0;
                        cart.items.forEach(function (item) {
                            count += item.quantity;
                        });

                        return count;
                    };
                });               
            }
        };

	}

})();