'use strict';

quotesApp.controller('EditquoteController',
    function EditquoteController($scope, quoteData, quoteService, $timeout) {

        $scope.quote = {};

        $scope.tagTransform = function (newTag) {
        var item = {
           ticker: newTag
        };
        return item;
        };

        $scope.savequote = function(quote, newquoteForm) {
            if(newquoteForm.$valid) {
                $scope.quote.ticker = quote.ticker;

                var onThumbComplete = function(data) {
                    if(!(data.StockExchange == null)){
                        $scope.quote.name = data.Name;
                        $scope.quote.exchange = data.StockExchange;
                        $scope.quote.price = data.LastTradePriceOnly;
                        quoteData.save($scope.quote)
                            .$promise
                            .then(function(response) { console.log('success', response)})
                            .catch(function(response) { console.log('failure', response)});
                    }
                    else
                        throw error;
                };
                
                var onError = function(reason) {
                    $scope.error = "Unavailable";
                    console.log($scope.error);
                };

                quoteService.getThumbData(quote.ticker).then(onThumbComplete, onError);
                

                $timeout($scope.goBackHome, 1500);
                
            }
        };


        $scope.cancelquote = function() {
        window.location = '/quoteDetails.html';
        }
        
        $scope.goBackHome = function() {
            window.location = '/index.html';
        }

    }
);