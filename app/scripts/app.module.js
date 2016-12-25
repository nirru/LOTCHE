'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('app', ['ionic',
    'ionicLazyLoad',
    'jett.ionic.scroll.sista',
    'jett.ionic.filter.bar',
    'ngStorage',
    'pascalprecht.translate',
    'app.core',
    'app.home',
    'app.categories',
    'app.layout',
    'app.menu',
    'app.product.details',
    'app.products',
    'app.search',
    'app.shopping_cart',
    'app.about'
]);
