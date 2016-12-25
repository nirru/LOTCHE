(function () {

    'use strict';

    angular.module('app.core').factory('bootstrap', bootstrap);

    bootstrap.$inject = ['$q', '$ionicPlatform', '$ionicHistory', '$ionicConfig', '$translate', '$timeout', 'connectivity', 'loaderPaneConfig', 'shopManager'];

    function bootstrap($q, $ionicPlatform, $ionicHistory, $ionicConfig, $translate, $timeout, connectivity, loaderPaneConfig, shopManager) {

        var isComplete = false;

        return {
            start: start
        };

        function start() {
            if (isComplete) {
                return $q.when(true);
            } else {
                return setLanguage().then(function () {

                    // translate in case back button text is set
                    if ($ionicConfig.backButton.text()) {
                        $translate('common.back', function (value) {
                            $ionicConfig.backButton.text(value);
                        });
                    }

                    return $translate('error.dataError').then(function (value) {
                            loaderPaneConfig.loaderPaneErrorMessage = value;
                        })
                        .then(function () {
                            return checkConnectivity();
                        })
                        .then(function () {
                            return loadShopData();
                        })
                        .then(function () {
                            if (window.cordova) {
                                $timeout(navigator.splashscreen.hide, 2000);
                            }
                            isComplete = true;
                        });
                });
            }
        }

        function setLanguage() {
            return $translate.onReady().then(function () {
                var deferred = $q.defer();

                if (navigator.globalization) {
                    navigator.globalization.getPreferredLanguage(function (lang) {
                        $translate.use(lang).finally(function () {
                            deferred.resolve();
                        });
                    }, function () {
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }

                return deferred.promise;
            });

        }

        function checkConnectivity() {
            var deferred = $q.defer();

            // make sure we are loading default view for the first time, otherwise resolve immediately
            if ($ionicHistory.backView()) {
                deferred.resolve();
            } else {
                $ionicPlatform.ready(function () {
                    if (navigator.connection) {
                        if (navigator.connection.type === Connection.NONE || navigator.connection.type === Connection.UNKNOWN) {
                            navigator.splashscreen.hide();
                            connectivity.showOfflineMessage($translate.instant('error.offlineError'));
                            document.addEventListener('online', function handleOnline() {
                                document.removeEventListener('online', handleOnline);
                                connectivity.hideOfflineMessage();
                                deferred.resolve();
                            });
                        } else {
                            deferred.resolve();
                        }
                    } else {
                        deferred.resolve();
                    }
                });
            }

            return deferred.promise;
        }

        function loadShopData() {
            return shopManager.loadShopData();
        }
    }

})();