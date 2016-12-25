(function () {

	'use strict';

	angular.module('app.products').factory('Variant', variant);

	function variant() {
		
		function Variant() {

		}

		Variant.prototype = {

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

			get sku() {
				return this._sku;
			},
			set sku(value) {
				this._sku = value;
			},

			get price() {
				return this._price;
			},
			set price(value) {
				this._price = value;
			},

			get salePrice() {
				return this._salePrice;
			},
			set salePrice(value) {
				this._salePrice = value;
			},

			get productId() {
				return this._productId;
			},
			set productId(value) {
				this._productId = value;
			},

			get imageId() {
				return this._imageId;
			},
			set imageId(value) {
				this._imageId = value;
			},

			get quantity() {
				return this._quantity;
			},
			set quantity(value) {
				this._quantity = value;
			},

			get hasQuantityLimit() {
				return this._hasQuantityLimit;
			},
			set hasQuantityLimit(value) {
				this._hasQuantityLimit = value;
			},

			get options() {
				return this._options;
			},
			set options(value) {
				this._options = value;
			},

			matches: function (options) {
				var self = this;
				return options.every(function (productOption) {
					return self.options[productOption.id] === productOption.selectedValue;
				});
			}				
		};

		Variant.build = function (source, adapter) {
			var variant = new Variant();
			if (adapter) {
				adapter.transform(variant, source);
			}
			else {
				// this might not be the best way to do this, since if we pass arbitrary JSON object as source
				// it will not create Variant instances and will copy variant arrays as is. But for the purpose of shallow cloning 
				// Variant instances it works just fine.
				angular.extend(variant, source);
			}

			return variant;
		};

		return Variant;
	}

})();