var http = require('http');
var fs = require('fs');
var file = 'hello.html'
var index = fs.readFileSync(file);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(index)
}).listen(8000);
