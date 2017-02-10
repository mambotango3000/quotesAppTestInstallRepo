'use strict';

quotesApp.controller('MainMenuController',
    function MainMenuController($scope, $location) {
        $scope.createquote = function() {
            $location.replace();
            $location.url('/newquote');
        }
        $scope.editProfile = function() {
            $location.url('/editProfile');
        }
        $scope.goHome = function() {
            $location.url('/quotes');
        }
    })