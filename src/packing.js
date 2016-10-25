var fs = require("fs");
var AdmZip = require('adm-zip');
var R = require("ramda");
var Util = require('./util');

/**
 * Unpacks a h5p
 *
 * @type {Function}
 * @param {String} dist
 * @param {String} src
 * @return {String} destDirectory
 */
exports.unpack = R.curry(function(dest, src) {
  var fileName = Util.parseFileName(src);
  var destDirectory = dest + '/' + fileName;
  var zip = new AdmZip(src);

  zip.extractAllTo(destDirectory, true);

  console.log('Unziped to: ', destDirectory);
  return destDirectory;
});

exports.pack = function() {

};