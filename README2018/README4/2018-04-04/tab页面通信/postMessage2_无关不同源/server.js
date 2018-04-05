var http = require('http');
var fs = require('fs');
var fileA = 'tabA.html'
var fileB = "tabB.html"
var bridge = "bridge.html"
var index = fs.readFileSync(fileA);
var second = fs.readFileSync(fileB);
var bridge = fs.readFileSync(bridge);

http.createServer(function (request, res) {
  var path = request.url;
  res.writeHead(200, {'Content-Type': 'text/html'})
  if(path == "/second") {
    res.end(second)
  }else {
    res.end(index)
  }
}).listen(8000);

http.createServer(function (request, res) {
  var path = request.url;
  res.writeHead(200, {'Content-Type': 'text/html'})
 if(path == "/bridge.html") {
    res.end(bridge)
  } else {
    res.end(index)
  }
}).listen(80);
