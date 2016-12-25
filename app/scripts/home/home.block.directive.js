(function() {

	'use strict';

	angular.module('app.home').directive('frontBlock', frontBlock);

	frontBlock.$inject = ['$parse'];

	function frontBlock($parse) {		

		return {
			templateUrl: 'app/scripts/home/block.html',			
			restrict: 'C',			
			link: function (scope, el, attr) {
				var options = $parse(attr['blockOptions'])(scope);

				scope.blockOptions = {};
				applyOptions(options, scope);

				scope.$watch(attr['blockOptions'], function() {
					applyOptions(options, scope);
				}, true);
			}
		};
	}

	function applyOptions(options, scope) {
		angular.extend(scope.blockOptions, options);
	}

})();