 var fs = require('fs');
var csv= fs.readFileSync('data.csv').toString();

	var lines = csv.split("\n");
 	var result = [];
 	var headers = lines[0].split(",");
 	var cont = 0;

  var http = require('http');
  var url = require('url');
  var path = require('path');
  var fs = require('fs');
  var port = 8000;

  var appMainFileName = "index.html";
  var mimeTypes = {
      "html": "text/html",
      "jpeg": "image/jpeg",
      "jpg": "image/jpeg",
      "png": "image/png",
      "js": "application/javascript",
      "css": "text/css"
  };


 	for(var i = 1; i < lines.length; i++)
 	{
 	 var obj = {};
 	 var currentline =lines[i].split(",");
 	 for (var j = 0; j < headers.length; j++)
 	 {
 	 	obj[headers[j]] =currentline[j];
 	 }
 	 result.push(obj);
 	}

 	var str=JSON.stringify(result);
 	str=str.replace()
 	console.log(str);
 	fs.writeFileSync("outputData.json",str);
  
  http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname,
      fileName = path.join(process.cwd(), uri);

    fs.exists(fileName, function(exists) {
      if (!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(fileName).isDirectory()) {
              fileName += '/' + appMainFileName;
          }

      fs.readFile(fileName, "binary", function(err, data) {
        if (err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200, {"Content-Type": mimeTypes[ fileName.split(".")[1] ]});
        response.write(data, "binary");
        response.end();
      });
    });


  }).listen(port);
