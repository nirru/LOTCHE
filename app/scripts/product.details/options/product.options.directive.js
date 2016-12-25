(function () {

  'use strict';

  angular.module('app.product.details')
    .directive('productOptions', productOptions);

  productOptions.$inject = ['$templateRequest', '$compile', 'OPTION_TEMPLATE_STATES'];

  function productOptions($templateRequest, $compile, OPTION_TEMPLATE_STATES) {
    return {
      restrict: 'A',
      scope: {
        optionChanged: '&optionChanged',
        product: '=product'
      },
      link: function(scope, el) {
        var VARIANTS_STATE_SHOW_ALL = 'app/scripts/product.details/options/options.show_all.template.html',
            VARIANTS_STATE_SHOW_WITHOUT_TITLE = 'app/scripts/product.details/options/options.no_title.template.html',
            templateURL = '',
            stateWatcher,            
            layoutState = scope.product.optionsLayoutState;

        if (layoutState) {
          renderTemplate(layoutState);
        } else {
          stateWatcher = scope.$watch('product.optionsLayoutState', function(value) {
            if (value) {
              stateWatcher();
              renderTemplate(value);
            }
          });
        }

        function renderTemplate(layoutState) {
          switch (layoutState) {
            case OPTION_TEMPLATE_STATES.HIDE_ALL:
              el.remove();
              return;
            case OPTION_TEMPLATE_STATES.SHOW_WITHOUT_TITLE:
              templateURL = VARIANTS_STATE_SHOW_WITHOUT_TITLE;
              break;
            case OPTION_TEMPLATE_STATES.SHOW_ALL:
              templateURL = VARIANTS_STATE_SHOW_ALL;
              break;
          }

          $templateRequest(templateURL).then(function(html) {
            var template = angular.element(html);
            el.append(template);
            $compile(template)(scope);
          });
        }
      }
    };
  }
})();

