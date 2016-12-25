(function () {

	'use strict';

	angular.module('common').factory('loaderPaneConfig', loaderPaneConfig);

	function loaderPaneConfig() {
		return {
			loaderPaneErrorMessage: '',
			loaderPaneEmptyMessage: ''
		};
	}

})();