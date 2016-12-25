(function () {

    'use strict';

    angular.module('app.core')
        .config(appConfig)
        .run(appRun);


    appConfig.$inject = ['$ionicConfigProvider', '$ionicFilterBarConfigProvider', '$translateProvider'];

    function appConfig($ionicConfigProvider, $ionicFilterBarConfigProvider, $translateProvider) {
        $ionicFilterBarConfigProvider.backdrop(false);
        $ionicFilterBarConfigProvider.closeOnSubmit(true);

        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '/translation.json'
        }).determinePreferredLanguage()
            .fallbackLanguage('en_US');
    }

    appRun.$inject = ['$ionicPlatform'];

    function appRun($ionicPlatform) {

        $ionicPlatform.ready(function () {

            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }

            if (window.cordova) {
                if (window.cordova.plugins.Keyboard) {
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    window.cordova.plugins.Keyboard.disableScroll(true);
                }
            }
        });
    }

})();