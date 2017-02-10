'use strict';

quotesApp.controller('quoteListController',
    function quoteListController($http, $scope, $location, quoteData, tickerService, quoteService, _) {

        tickerService.getData()
            .then(getAllQuotesSuccess, null)
            .catch(onError);

        function getAllQuotesSuccess(quotes) {
            var Index = -1;
            var _quotes = quotes;
            $scope.quotes = [];

            angular.forEach(_quotes, function(quote) {
                $scope.quotes.push(quote);
            });
            
            var onThumbComplete = function(data) {
                Index++;
                $scope.quotes[Index].index = Index;
                $scope.quotes[Index].ticker = data.symbol;
                $scope.quotes[Index].name = data.Name;
                $scope.quotes[Index].exchange = data.StockExchange;
                $scope.quotes[Index].price = data.LastTradePriceOnly;
                $scope.quotes[Index].PreviousClose = data.PreviousClose;
                };

            
            angular.forEach($scope.quotes, function(quote) {
                quoteService.getThumbData(quote.ticker).then(onThumbComplete, onError);
            });

        }

        var onError = function(reason) {
            $scope.error = "Unavailable";
            console.log($scope.error);
        };


        $scope.delQuote = function (idx) {
        var tckr = $scope.quotes[idx].ticker;
        $scope.quotes[idx] = {};
        quoteData.delQuote(tckr)
        tickerService.getData()
            .then(getAllQuotesSuccess, null)
            .catch(onError);
        };


    }
);

