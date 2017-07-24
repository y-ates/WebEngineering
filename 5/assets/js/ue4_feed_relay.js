var xml;
var http = require("http");
var fs = require('fs');
var index = fs.readFileSync('../../index.html');
var js = fs.readFileSync('comment.js');
var request = require('request');
request('http://aktuell.ruhr-uni-bochum.de/rss/index.rss', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        xml = body;
    }
});
http.createServer(function(req, res) {
    if(req.url=='/rss') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, {"Content-Type": "text/xml"});
        res.write(xml);
        res.end();
    }
    else if(req.url=='/js') {
        js = fs.readFileSync('comment.js');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, {"Content-Type": "text/javascript"});
        res.end(js);
    }
    else{
        index = fs.readFileSync('../../index.html');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(index);
    }
}).listen(8888);
