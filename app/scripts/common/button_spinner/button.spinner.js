(function () {

    'use strict';

    angular.module('common').directive('buttonSpinner', buttonSpinner);

    buttonSpinner.$inject = ['$timeout'];

    function buttonSpinner($timeout) {
        return {
            restrict: 'A',
            scope: true,
            compile: function (el, attr) {
                var text = el.text(),
                    textWrapper,
                    spinner,
                    animation = attr['spinnerButtonAnimation'] || '';

                el.addClass('button-spinner');

                el.text('');
                textWrapper = angular.element('<span class="button-spinner-label">' + text + '</span>');
                el.append(textWrapper);

                spinner = angular.element('<ion-spinner icon="' + animation + '" ng-if="animationStarted"></ion-spinner>');
                el.append(spinner);

                return {
                    post: function (scope, el, attr) {

                        var appearAnimation = 'slideLeft',
                            spinnerActive = attr['buttonSpinner'] === true,
                            delay = attr['buttonSpinnerDelay'] && parseInt(attr['buttonSpinnerDelay']),
                            minAnimationTime = attr['buttonSpinnerMinTime'] && parseInt(attr['buttonSpinnerMinTime']),                            
                            timeoutPromise;
                            
                        scope.animationStarted = false;

                        el.addClass(appearAnimation);

                        attr.$observe('buttonSpinner', function (newValue) {
                            newValue = newValue === 'true';
                            if (spinnerActive !== newValue) {

                                spinnerActive = newValue;

                                if (newValue) {
                                    if (delay) {
                                        timeoutPromise = $timeout(function () {
                                        	activateSpinner();
                                        	timeoutPromise = null;
                                        }, delay);
                                    }
                                    else {
                                    	activateSpinner();
                                    }
                                }
                                else {
                                	if (timeoutPromise) {
                                		$timeout.cancel(timeoutPromise);                                		
                                	}
                                	if (minAnimationTime) {
                                		$timeout(function () {
                                			deactivateSpinner();
                                		}, minAnimationTime);
                                	}
                                	else {
                                		deactivateSpinner();
                                	}                                	
                                }                                
                            }
                        });

                        function activateSpinner() {  
                        	if (!scope.animationStarted) {
                        		el.addClass('spinner-active');
                            	el.removeClass('spinner-idle');
                            	scope.animationStarted = true;
                        	}                            
                        }

                        function deactivateSpinner() {
                        	if (scope.animationStarted) {
                        		el.addClass('spinner-idle');
                            	el.removeClass('spinner-active');
                            	scope.animationStarted = false;
                        	}
                        }
                    }
                };
            }
        };
    }

})();