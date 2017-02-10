(function() {
    var quoteService = function($http) {
      var url = "http://query.yahooapis.com/v1/public/yql";

      var getData = function(symb) {
        var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symb + "')");
        return $http.get(url + '?q=' + data + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
          .then(function(response) {
            return response.data.query.results.quote;
          });
      };
      
      var getPrice = function(symb) {
        var data = encodeURIComponent("select LastTradePriceOnly from yahoo.finance.quotes where symbol in ('" + symb + "')");
        return $http.get(url + '?q=' + data + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
          .then(function(response) {
            return response.data.query.results.quote.LastTradePriceOnly; 
          });
      };
     
      var getName = function(symb) {
        var data = encodeURIComponent("select Name from yahoo.finance.quotes where symbol in ('" + symb + "')");
        return $http.get(url + '?q=' + data + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
          .then(function(response) {
            return response.data.query.results.quote.Name; 
          });
      };

      var getExchange = function(symb) {
        var data = encodeURIComponent("select StockExchange from yahoo.finance.quotes where symbol in ('" + symb + "')");
        return $http.get(url + '?q=' + data + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
          .then(function(response) {
            return response.data.query.results.quote.StockExchange; 
          });
      };

      var getThumbData = function(symb) {
        var data = encodeURIComponent("select symbol, Name, StockExchange, LastTradePriceOnly, PreviousClose from yahoo.finance.quotes where symbol in ('" + symb + "')");
        return $http.get(url + '?q=' + data + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
          .then(function(response) {
            return response.data.query.results.quote; 
          });
      };

      var getMarkets = function(symb) {
        var data = encodeURIComponent("select LastTradePriceOnly, PreviousClose from yahoo.finance.quotes where symbol in ('" + symb + "')");
        //return $http.get(url + '?q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        return $http.get(url + '?q=' + data + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
          .then(function(response) {
            return response.data.query.results.quote; 
          });
      };

      return {
        getData: getData,
        getPrice: getPrice,
        getName: getName,
        getExchange: getExchange,
        getThumbData: getThumbData,
        getMarkets: getMarkets
      };

    };

  var module = angular.module("quotesApp");
  module.factory("quoteService", quoteService);

}());