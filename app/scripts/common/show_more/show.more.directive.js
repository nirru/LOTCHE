(function () {

    'use strict';

    angular.module('common').directive('showMore', showMore);

    showMore.$inject = ['$ionicScrollDelegate', '$compile', '$timeout'];

    function showMore($ionicScrollDelegate, $compile, $timeout) {

        var wrapperHTML = '<div><div class="show-more-content"><div class="fader" ng-if="expandable && !expanded" style="text-align: right; position: absolute; bottom:0; right:0; width: 100%; height: 2.4em; background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9) 100%);"></div></div><a class="button button-clear button-positive button-small show-more-button" ng-if="expandable" ng-click="handleMoreClick()">{{buttonLabel}}</div></div>';

        return {
            priority: 10,
            restrict: 'C',
            link: function (scope, element, attr) {

                var expandableContent,
                    showMoreLabel = attr['showMoreLabel'] || 'Show more',
                    showLessLabel = attr['showLessLabel'] || 'Show less',
                    maxLines = parseInt(attr['maxLines'] || 5);            

                scope.handleMoreClick = handleMoreClick;
                scope.expandable = false;
                scope.expanded = false;

                scope.$watch(attr.showMore, function () {
                    var wrapper = $compile(wrapperHTML)(scope),
                        contents = element.contents(),
                        expandableContentEl,
                        lineCount;

                    element.children().remove();
                    element.append(wrapper.contents());
                    expandableContent = angular.element(element[0].querySelector('.show-more-content'));
                    expandableContent.append(contents);
                    expandableContentEl = expandableContent[0];

                    expand();                    
                    lineCount = countLines(expandableContentEl);
                    collapse();

                    scope.expandable = lineCount > maxLines;                    
                });

                function handleMoreClick() {
                    // the reason for wrapping this in timeout is to prevent the click event from bleeding through
                    // to the element below
                    $timeout(function () {
                        toggleExpand();
                        $ionicScrollDelegate.resize();
                    });                    
                }

                function toggleExpand() {
                    scope.expanded = !scope.expanded;

                    if (scope.expanded) {
                        expand();                        
                    } else {
                        collapse();                        
                    }
                }

                function expand() {
                    expandableContent.css('height', 'auto');                    
                    scope.buttonLabel = showLessLabel;
                }

                function collapse() {
                    expandableContent.css('position', 'relative');  
                    expandableContent.css('height', (maxLines * 1.2) + 'em');   
                    expandableContent.css('lineHeight', '1.2em'); 
                    expandableContent.css('overflow', 'hidden');
                    scope.buttonLabel = showMoreLabel;
                }
            }
        };
    }

    function countLines(el) {
        var divHeight = el.offsetHeight;
        var lineHeight = parseInt(window.getComputedStyle(el).getPropertyValue('line-height'));
        var lines = divHeight / lineHeight;

        return lines;
    }



})();