quotesApp.factory('quoteData', function($resource) {
    var resource = $resource('/data/quote/:ticker', {ticker:'@ticker'}, {});
    return {
        getQuote: function(ticker) {
            return resource.get({ticker:ticker});
        },
        save: function(quote) {
            //quote.ticker = {quote.ticker};
            return resource.save(quote);
        },
        delQuote: function(ticker) {
            //quote.ticker = {quote.ticker};
            return resource.delete({ticker});
        },
    };
});
