(function () {

	'use strict';

	angular.module('app.shopping_cart').factory('CartItem', cartItem);

	function cartItem() {
		
		function CartItem() {

		}

		CartItem.prototype = {

			get id() {
				return this._id;
			},
			set id(value) {
				this._id = value;
			},
			get title() {
				return this._title;
			},
			set title(value) {
				this._title = value;
			},
			get description() {
				return this._description;
			},
			set description(value) {
				this._description = value;
			},
			get price() {
				return this._price;
			},
			set price(value) {
				this._price = value;
			},
			get sku() {
				return this._sku;
			},
			set sku(value) {
				this._sku = value;
			},
			get quantity() {
				return this._quantity;
			},
			set quantity(value) {
				this._quantity = value;
			},
			get image() {
				return this._image;
			},
			set image(value) {
				this._image = value;
			},
			get variantDescription() {
				return this._variantDescription;
			},
			set variantDescription(value) {
				this._variantDescription = value;
			}			
		};

		CartItem.build = function (source, adapter) {
			var cartItem = new CartItem();
			if (adapter) {
				adapter.transform(cartItem, source);
			}
			else {
				angular.extend(cartItem, source);
			}

			return cartItem;
		};

		return CartItem;
	}

})();