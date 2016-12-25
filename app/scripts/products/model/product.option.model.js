(function () {

	'use strict';

	angular.module('app.products').factory('ProductOption', option);

	function option() {
		
		function ProductOption() {

		}

		ProductOption.prototype = {

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

			get values() {
				return this._values;
			},
			set values(value) {
				this._values = value;
			},

			get selectedValue() {
				return this._selectedValue;
			},
			set selectedValue(value) {
				this._selectedValue = value;
			}
		};

		ProductOption.build = function (source, adapter) {
			var option = new ProductOption();
			if (adapter) {
				adapter.transform(option, source);
			}
			else {
				angular.extend(option, source);
			}

			return option;
		};

		return ProductOption;
	}

})();