(function () {

    'use strict';

    angular.module('common')
        .config(ionViewDecorator);

    ionViewDecorator.$inject = ['$provide'];

    function ionViewDecorator($provide) {
        $provide.decorator('ionViewDirective', function ($delegate) {
            var directive, compile;
            directive = $delegate[0];
            compile = directive.compile;
            directive.compile = function () {
                var link = compile.apply(this, arguments);
                return function Link(scope, el, attrs) {
                    // additional nav-bar-transparent related behavior

                    var fakeBar;

                    scope.$on('$ionicView.beforeEnter', function (event, transition) {
                        var transparent = scope.$eval(attrs.navBarTransparent),
                            textTheme = attrs.textTheme || 'light',
                            navBars = document.querySelectorAll('.nav-bar-block'),
                            activeBar = document.querySelector('.nav-bar-block[nav-bar=\'active\'] ion-header-bar'),
                            classStr = 'bar-transparent' + (textTheme === 'dark' ? ' dark-text' : ''),
                            barClasses,
                            view;

                        if (transparent) {

                            if (transition.direction !== 'none') {

                                // find currently active view
                                view = angular.element(document.querySelector('ion-view[nav-view="active"]'));

                                if (view.attr('nav-bar-transparent') !== 'true') {
                                    // we need to find the class names   
                                    barClasses = activeBar.className;
                                    if (!fakeBar) {
                                        fakeBar = angular.element('<div class="bar bar-header fake-bar"></div>');
                                        fakeBar.addClass(barClasses);
                                    }
                                    if (!view[0].querySelector('.fake-bar')) {
                                        // append the fake header                                
                                        view.append(fakeBar);
                                    }
                                }
                            }

                            angular.element(navBars).addClass(classStr);

                            // if text theme is dark we should switch the status bar to dark theme as well
                            if (textTheme === 'dark' && window.StatusBar) {
                                StatusBar.styleDefault();
                            }

                        } else {
                            angular.element(navBars).removeClass('bar-transparent dark-text');

                            // set the status bar style back to light
                            if (window.StatusBar) {
                                StatusBar.styleLightContent();
                            }
                        }
                    });

                    return link.apply(this, arguments);
                };
            };
            return $delegate;
        });
    }

})();