'use strict';

angular.module('simple-angular-node-project', [
    'ngResource',
    'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('app', {
            url: '/app',
            templateUrl: 'views/app.html',
            controller: 'AppCtrl',
            abstract: true
        })

        .state('app.main', {
            url: '/main',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            data: {
                title: 'Random Spoilers'
            }
        })

        $urlRouterProvider.otherwise('/app/main')
    }
])