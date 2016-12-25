(function () {

    'use strict';

    angular.module('common').factory('connectivity', connectivity);

    connectivity.$inject = ['$ionicLoading'];

    function connectivity($ionicLoading) {
        var showingMessage,
            defaultOfflineMessage = 'Your device appears to be offline. Please establish internet connection in order to continue.',
            defaultErrorMessage = 'Unable to perform the operation. Please check your connection and try again.';

        return {
            showOfflineMessage: showOfflineMessage,
            hideOfflineMessage: hideOfflineMessage,
            showError: showError
        };

        function showOfflineMessage(message) {
            if (!showingMessage) {
                $ionicLoading.show({
                    template: message || defaultOfflineMessage
                });

                showingMessage = true;
            }
        }

        function hideOfflineMessage() {
            if (showingMessage) {
                $ionicLoading.hide();
                showingMessage = false;
            }
        }

        function showError(message) {
            if (typeof message === 'undefined') {
                message = defaultErrorMessage;
            }

            if (window.plugins && window.plugins.toast) {
                window.plugins.toast.showWithOptions({
                    message: message,
                    duration: 'short', // 2000 ms
                    position: 'bottom'
                });
            } else {
                alert(message);
            }
        }
    }

})();