(function () {

    'use strict';

    angular.module('common').factory('$ionicSearchPanel', searchPanel);

    searchPanel.$inject = ['$rootScope', '$timeout', '$ionicFilterBar', '$ionicModal', '$ionicBody'];

    function searchPanel($rootScope, $timeout, $ionicFilterBar, $ionicModal, $ionicBody) {

        var modalTemplate = '<ion-modal-view class="search-panel"><ion-content></ion-content></ion-modal-view>',
            config = {
                ios: {
                    animation: 'fade-in-bottom'
                },
                android: {
                    animation: 'fade-in-right'
                },
                other: {
                    animation: ''
                }
            },
            panel = createPanel();

        return {
            show: show
        };

        function show() {
            var args = Array.prototype.slice.call(arguments);
            $ionicFilterBar.show.apply($ionicFilterBar, args);
            showPanel();
        }

        function showPanel() {
        	ionic.requestAnimationFrame(function () {
        		panel.show();
        	});
            

            var deregister = $rootScope.$on('modal.shown', function modalShown () {
                var backdrop, filterBarEl, filterBarScope, removeFilterBar;

                // make the rest of the screen tappable so we can interact with the fileter bar
                backdrop = document.querySelector('.modal-backdrop');
                backdrop.style['pointer-events'] = 'none';
                $timeout(function () {
                    $ionicBody.removeClass('modal-open');
                }, 500);

                // gain access to filter-bar scope
                filterBarEl = document.querySelector('.filter-bar');
                filterBarScope = angular.element(filterBarEl).scope().$parent;

                // decorate removeFilterBar method to hide the search panel in sync with the filter bar
                removeFilterBar = filterBarScope.removeFilterBar;
                filterBarScope.removeFilterBar = function () {
                    var args = Array.prototype.slice.call(arguments);

                    hidePanel();                    

                    if (removeFilterBar && typeof removeFilterBar === 'function') {
                    	$timeout(function () {
                    		removeFilterBar.apply(filterBarScope, args);
                    	}, 20);
                        
                    }

                    // revert to the original implementation
                    filterBarScope.removeFilterBar = removeFilterBar;

                    deregister();
                };

            });
        }

        function hidePanel() {
            var backdrop = document.querySelector('.modal-backdrop');
            delete backdrop.style['pointer-events'];
            panel.hide();            
        }

        function createPanel() {
            var platformConfig = config[ionic.Platform.platform()];
            if (!platformConfig) {
                platformConfig = config['other'];
            }

            return $ionicModal.fromTemplate(modalTemplate, {
                backdropClickToClose: false,
                animation: platformConfig.animation
            });
        }
    }

})();