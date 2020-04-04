'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('CovidN').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/local.html'
            })
            .state('global', {
                url: '/global',
                templateUrl: 'templates/global.html'
            })
             .state('corona', {
                url: '/corona',
                templateUrl: 'templates/aboutCorona.html'
            });
    }
]);