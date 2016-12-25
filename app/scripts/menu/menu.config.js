(function () {

    'use strict';

    var menu = angular.module('app.menu');

    menu.constant('MENU_ITEMS', [{
            title: 'Home',
            icon: 'icon ion-home',
            badge: false,
            route: 'app.home',
            root: true
        }

    ]);
})();