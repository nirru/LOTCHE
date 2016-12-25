(function () {

    'use strict';


    angular.module('common').directive('hideOnscroll', hideOnscroll);

    hideOnscroll.$inject = ['$timeout'];

    function hideOnscroll($timeout) {

        var HIDE_UP = 'hide-up',
            HIDE_DOWN = 'hide-down';

        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var classesToHide = scope.$eval(attrs['hideOnscroll']),
                    offset = scope.$eval(attrs['hideOnscrollOffset']) || 0,
                    rootElement = el[0],
                    hideTargets;

                // delay finding targets since they might be hidden by ng-if
                $timeout(function () {
                    hideTargets = findElementsToHide(rootElement, classesToHide);
                    bindScrolls(scope, hideTargets, offset);
                });
            }
        };

        function findElementsToHide(rootElement, classesToHide) {
            var elementsToHide;
            if (classesToHide.constructor === Array) {
                elementsToHide = classesToHide.map(function (className) {
                    var element = rootElement.querySelector('.' + className),
                        elementClasses,
                        hideConfig = {};
                    if (element) {
                        element.className += ' hide-onscroll-target';
                        hideConfig.node = element;
                        elementClasses = element.className.split(' ');
                        if (elementClasses.indexOf(HIDE_UP) !== -1) {
                            hideConfig.direction = HIDE_UP;
                        } else if (elementClasses.indexOf(HIDE_DOWN) !== -1) {
                            hideConfig.direction = HIDE_DOWN;
                        } else {
                            hideConfig.direction = HIDE_UP;
                        }

                    } else {
                        hideConfig.element = null;
                    }

                    return hideConfig;
                });

                return elementsToHide;

            } else {
                throw new Error('Incorrect hide-onscroll attribute value. Expecting array.');
            }
        }

        function bindScrolls(scope, targets, offset) {
            var scrollTop = 0;
            scope.$on('hideOnscroll.scroll', function (event, scrollEvent) {
                //console.log('Scrolling: ' + scrollEvent.scrollTop);
                var newScrollTop = scrollEvent.target.scrollTop;

                if (newScrollTop > scrollTop) {
                    if (newScrollTop >= offset) {
                        hideTargets(targets);
                    }

                } else {
                    showTargets(targets);
                }

                scrollTop = newScrollTop;

            });
        }

        function hideTargets(targets) {
            targets.forEach(function (target) {
                if (target.node) {
                    if (target.direction === HIDE_UP) {
                        angular.element(target.node).addClass('hide-onscroll-up');
                    } else {
                        angular.element(target.node).addClass('hide-onscroll-down');
                    }
                }
            });
        }

        function showTargets(targets) {
            targets.forEach(function (target) {
                if (target.node) {
                    if (target.direction === HIDE_UP) {
                        angular.element(target.node).removeClass('hide-onscroll-up');
                    } else {
                        angular.element(target.node).removeClass('hide-onscroll-down');
                    }
                }
            });
        }
    }

    angular.module('common').directive('hideOnscrollContent', hideOnscrollContent);

    function hideOnscrollContent() {
        return {
            restrict: 'C',
            link: function (scope, el) {

                el.bind('scroll', function (event) {
                    scope.$emit('hideOnscroll.scroll', event);
                });
            }
        };
    }

})();