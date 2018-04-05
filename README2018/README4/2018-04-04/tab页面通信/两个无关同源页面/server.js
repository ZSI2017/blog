var http = require('http');
var fs = require('fs');
var fileA = 'index.html'
var fileB = "second.html"
var index = fs.readFileSync(fileA);
var second = fs.readFileSync(fileB);

// http.createServer(function (request, res) {
//   var path = request.url;
//   res.writeHead(200, {'Content-Type': 'text/html'})
//   if(path == "/second") {
//     res.end(second)
//   }else {
//     res.end(index)
//   }
// }).listen(8000);
http.createServer(function (request, res) {
  var path = request.url;
  res.writeHead(200, {'Content-Type': 'text/html'})
  if(path == "/second") {
    res.end(second)
  }else {
    res.end(index)
  }
}).listen(80);
