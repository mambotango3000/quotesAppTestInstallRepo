'use strict';

quotesApp.controller('quoteController', 
    function quoteController($scope, quoteService, quoteData, $routeParams, $route, $location, $anchorScroll) {
        

        quoteData.getQuote($route.current.pathParams.ticker)
            .$promise
            .then(function(quote) {
                $scope.quote = quote;
                console.log($scope.quote);
                console.log($scope.quote.ticker);

                var onGetDetails = function(data) {
                    $scope.ticker = data.ticker;
                    $scope.quote.name = data.Name;
                    $scope.quote.Open = data.Open;
                    $scope.quote.PreviousClose = data.PreviousClose;
                    $scope.quote.exchange = data.StockExchange;
                    $scope.quote.YearsRange = data.YearRange;
                    $scope.quote.DaysRange = data.DaysRange;
                    $scope.quote.FiftydayMovingAverage = data.FiftydayMovingAverage;
                    $scope.quote.Volume = data.Volume;
                    $scope.quote.AverageDailyVolume = data.AverageDailyVolume;
                    $scope.quote.PERatio = data.PERatio;
                    $scope.quote.MarketCapitalization = data.MarketCapitalization;
                    $scope.quote.EBITDA = data.EBITDA;
                    $scope.quote.BookValue = data.BookValue;
                    $scope.quote.PriceBook = data.PriceBook;
                    $scope.quote.PriceSales = data.PriceSales;
                    $scope.quote.EarningsShare = data.EarningsShare;
                    $scope.quote.DividendShare = data.DividendShare;
                    $scope.quote.DividendYield = data.DividendYield;

                    var onComplete = function(data) {
                        $scope.quote.price = data.LastTradePriceOnly;
                        $scope.quote.PercentChange = data.PercentChange;
                        $scope.quote.change = data.Change;
                        $scope.quote.DaysLow = data.DaysLow;
                        $scope.quote.DaysHigh = data.DaysHigh;
                    };

                    // var onError = function(reason) {
                    //     $scope.error = "Unavailable";
                    //     console.log("xxxx" + $scope.error);
                    // if ($route.current.pathParams.ticker) {
                    //     quoteService.getData($route.current.pathParams.ticker).then(onGetDetails, onError);
                    // }
                    // };

                    setInterval(function() {
                        if ($route.current.pathParams.ticker)
                            quoteService.getData($route.current.pathParams.ticker).then(onComplete, onError);
                    }, 2000);


                }

                var onError = function(reason) {
                    $scope.error = "Unavailable";
                    console.log("xxxx" + $scope.error);
                    if ($route.current.pathParams.ticker) {
                        quoteService.getData($route.current.pathParams.ticker).then(onGetDetails, onError);
                    }
                };

                if ($route.current.pathParams.ticker) {
                    quoteService.getData($route.current.pathParams.ticker).then(onGetDetails, onError);
                }

            
            })
            .catch(function(response) { console.log(response);});

    }
);