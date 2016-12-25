(function () {

    'use strict';

    angular.module('common')
        .directive('selectAutoWidth', selectAutoWidth);

    selectAutoWidth.$inject = ['$timeout'];

    function selectAutoWidth($timeout) {
        return {
            restrict: 'C',
            link: function (scope, el) {
                var tmpSelect = angular.element('<select class="tmp-select" style="position:absolute; left: -2000px; right: initial;"><option></option></select>'),
                    originalSelect = angular.element(el[0].querySelector('select:first-child')),
                    selectVisibility = el.css('visibility');

                if (originalSelect[0]) {
                    el.append(tmpSelect);
                    el.css('visibility', 'hidden');

                    $timeout(function () {
                        onOptionChanged();
                    });

                    originalSelect.on('change', onOptionChanged);
                }

                function onOptionChanged() {
                    var selectedOption = originalSelect[0].options[originalSelect[0].selectedIndex];
                    if (selectedOption) {
                        var computedWidth;

                        tmpSelect.find('option').html(angular.element(selectedOption).text());
                        computedWidth = tmpSelect[0].offsetWidth;
                        originalSelect[0].style.width = computedWidth + 'px';
                    }

                    el.css('visibility', selectVisibility);
                }
            }
        };
    }

})();