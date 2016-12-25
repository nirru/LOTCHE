(function () {

	'use strict';

	angular.module('app.shopping_cart').factory('Cart', cart);

	function cart() {
		
		function Cart() {

		}

		Cart.prototype = {

			get id() {
				return this._id;
			},
			set id(value) {
				this._id = value;
			},
			get total() {
				return this._total;
			},
			set total(value) {
				this._total = value;
			},
			get items() {
				return this._items;
			},
			set items(value) {
				this._items = value;
			}		
			
		};

		Cart.build = function (source, adapter) {
			var cart = new Cart();
			if (adapter) {
				adapter.transform(cart, source);
			}
			else {				
				angular.extend(cart, source);
			}

			return cart;
		};

		return Cart;
	}

})();