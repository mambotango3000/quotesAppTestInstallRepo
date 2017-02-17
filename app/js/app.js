'use strict';

var quotesApp = angular.module('quotesApp', ['ngResource', 'ngRoute', 'underscore', 'ngSanitize', 'ui.select'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/newquote',
            {
                templateUrl:'templates/Newquote.html',
                controller: 'EditquoteController'
            });
        $routeProvider.when('/quotes',
            {
                templateUrl: 'templates/quoteList.html',
                controller: 'quoteListController'
            });
        $routeProvider.when('/editProfile',
            {
                templateUrl: 'templates/EditProfile.html',
                controller: 'EditProfileController'
            });
        $routeProvider.when('/quote/:ticker',
            {
                templateUrl: 'templates/quoteDetails.html',
                controller: 'quoteController',
                
            });
        $routeProvider.otherwise({redirectTo: '/quotes'});

        $locationProvider.html5Mode(true);

        quotesApp.constant('_',
            window._
        ); 


    });
