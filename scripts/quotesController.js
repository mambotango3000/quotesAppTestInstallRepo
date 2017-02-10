var fs = require('fs');

module.exports.get = function(req, res) {
    var quote = fs.readFileSync('app/data/quote/' + req.params.ticker + '.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(quote);
};

module.exports.save = function(req, res) {
    var quote = req.body;
    fs.writeFileSync('app/data/quote/' + req.params.ticker + '.json', JSON.stringify(quote));
    res.send(quote);
};

module.exports.saveGravatar = function(req, res) {
    var gravAddress = req.body;
    fs.writeFileSync('app/data/gravatar/' + req.params.gravatar + '.json', JSON.stringify(gravAddress));
    res.send(gravAddress);
};

module.exports.getAll = function(req, res) {
    var path = 'app/data/quote/';

    var files = [];
    try {
        files = fs.readdirSync(path);
    }
    catch (e) {
        console.log(e)
        res.send('[]');
        res.end();
    }
    var results = "[";
    for (var idx = 0; idx < files.length; idx++) {
        if (files[idx].indexOf(".json") == files[idx].length - 5) {
            results += fs.readFileSync(path + "/" + files[idx]) + ",";
        }
    }
    results = results.substr(0, results.length - 1);
    results += "]";

    res.setHeader('Content-Type', 'application/json');
    res.send(results);
    res.end();
};

module.exports.delQuote = function(req, res) {
    fs.unlink('app/data/quote/' + req.params.ticker + '.json', function() {
        res.send ({
            status: "200",
            responseType: "string",
            response: "success"
        });
        console.log("quotesController: " + 'app/data/quote/' + req.params.ticker + '.json');
    });
}
