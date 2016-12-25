(function () {

    'use strict';

    angular.module('app.about').controller('AboutController', AboutController);

    AboutController.$inject = ['AppContext'];

    function AboutController(AppContext) {
        var vm = this;

        vm.phone = AppContext.PHONE;
        vm.email = AppContext.EMAIL;
        vm.website = AppContext.WEBSITE;
        vm.address = AppContext.ADDRESS;

        vm.navigateToMaps = navigateToMaps;
        vm.navigateToSite = navigateToSite;

        function navigateToMaps(address) {
            if (launchnavigator) {
                launchnavigator.navigate(address);
            }            
        }

        function navigateToSite($event, url) {
            $event.preventDefault();
            window.open(url, '_system');
        }
    }

})();