(function () {

    'use strict';

    angular.module('common').directive('loaderPane', loaderPane);

    loaderPane.$inject = ['$parse', '$q', 'loaderPaneConfig'];

    function loaderPane($parse, $q, loaderPaneConfig) {

        var paneHTML = '<div class="loader-pane" ng-if="viewOptions.isLoading || viewOptions.dataError || viewOptions.emptySet"><ion-spinner class="loader-pane-spinner" icon="{{viewOptions.spinnerAnimation}}" ng-if="viewOptions.isLoading && viewOptions.showSpinner"></ion-spinner><div class="loader-pane-error" ng-if="viewOptions.dataError">{{viewOptions.errorMessage}}</div><div class="loader-pane-empty" ng-if="viewOptions.emptySet">{{viewOptions.emptyMessage}}</div></div>';

        return {
            restrict: 'A',
            compile: function (el) {
                el.append(angular.element(paneHTML));

                return {
                    post: function (scope, el, attrs) {
                        var promiseExpr = attrs['loaderPane'],
                            showSpinnerExpr = attrs['loaderPaneShowSpinner'],
                            promise;

                        scope.viewOptions = {};

                        scope.viewOptions.isLoading = false;
                        scope.viewOptions.dataError = false;
                        scope.viewOptions.emptySet = false;
                        scope.viewOptions.errorMessage = $parse(attrs.loaderPaneErrorMessage || '')(scope) || loaderPaneConfig.loaderPaneErrorMessage;
                        scope.viewOptions.emptyMessage = $parse(attrs.loaderPaneEmptyMessage || '')(scope) || loaderPaneConfig.loaderPaneEmptyMessage;
                        scope.viewOptions.spinnerAnimation = attrs['loaderPaneSpinnerAnimation'];

                        scope.$watch(promiseExpr, function (newValue) {
                            if (newValue) {

                                // wrap in promise in case we receive plain value
                                promise = $q.when(newValue);

                                // re-parse showSpinner value
                                if (showSpinnerExpr) {
                                    scope.viewOptions.showSpinner = $parse(showSpinnerExpr || '')(scope);
                                } else {
                                    // show spinner by default when loading
                                    scope.viewOptions.showSpinner = true;
                                }

                                scope.viewOptions.isLoading = true;
                                scope.viewOptions.dataError = false;
                                scope.viewOptions.emptySet = false;
                                promise.then(function success(result) {
                                    var resultIsArray = Object.prototype.toString.call(result) === '[object Array]';
                                    scope.viewOptions.dataError = false;
                                    scope.viewOptions.emptySet = resultIsArray ? (result.length === 0) : !!result;
                                }, function error() {
                                    scope.viewOptions.dataError = true;
                                }).finally(function () {
                                    scope.viewOptions.isLoading = false;
                                });
                            }
                        });
                    }
                };
            }
        };
    }

})();