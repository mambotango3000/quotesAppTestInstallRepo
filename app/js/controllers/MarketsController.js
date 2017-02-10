'use strict';

quotesApp.controller('marketsController', 
    function marketsController($scope, quoteService, quoteData, $routeParams, $route) {
        
        $scope.sp = '';
        $scope.dj = '';
        $scope.nd = '';
        $scope.djpc = '';
        $scope.sppc = '';
        $scope.ndpc = '';
    
        var onDowComplete = function(data) {
            $scope.dj = data.LastTradePriceOnly * 100;
            $scope.djpc = data.PreviousClose * 100;
        };
        var onSPComplete = function(data) {
            $scope.sp = data.LastTradePriceOnly;
            $scope.sppc = data.PreviousClose;            
        };
        var onNDComplete = function(data) {
            $scope.nd = data.LastTradePriceOnly;
            $scope.ndpc= data.PreviousClose;
        };
        
        var onError = function(reason) {
            $scope.error = "Unavailable";
            console.log($scope.error);
        };

        setInterval(function() {
            quoteService.getMarkets("DIA").then(onDowComplete, onError);
        }, 2000);

        setInterval(function() {
            quoteService.getMarkets("^GSPC").then(onSPComplete, onError);
        }, 2000);

        setInterval(function() {
            quoteService.getMarkets("^IXIC").then(onNDComplete, onError);
        }, 2000);

    }
);