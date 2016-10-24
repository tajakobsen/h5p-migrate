var fs = require("fs");
var R = require("ramda");

/**
 *
 */
exports.readFileAsJson = function(path){
  return JSON.parse(fs.readFileSync(path, 'utf8'));
};