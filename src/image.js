var http = require('http'),
  fs = require('fs'),
  R = require("ramda"),
  Util = require("./util");

exports.download = R.curry(function(dest, path) {
  var auth = Util.getAuth();
  var options = {
    hostname: 'red.ndla.no',
    path: path,
    auth: auth
  };

  var fileName = Util.parseFileName(path);
  var fileDest = dest + '/' + fileName;

  var request = http.get(options, (res) => {
    var imagedata = '';
    res.setEncoding('binary');

    res.on('data', function(chunk){
      imagedata += chunk
    });

    res.on('end', () => {
      fs.writeFile(fileDest, imagedata, 'binary', function(err){
        if (err) {
          throw err;
        } else {
          console.log(`Image saved to: ${fileDest}`);
        }
      })
    })
  });

  request.end();
});