(function() {
    var tickerService = function($http) {
      //var url = "data/quote";

      var getData = function() {
        return $http({
          method: 'GET',
          url: 'data/quote'
        })
          .then(function(response) {
            return response.data;
          });
      };

      return {
        getData: getData,
      };
    };

  var module = angular.module("quotesApp");
  module.factory("tickerService", tickerService);

}());