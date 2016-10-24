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
 * @return {String} destFolder
 */
exports.unpack = R.curry(function(dest, src) {
  var fileName = Util.parseFileName(src);
  var destFolder = dest + '/' + fileName;
  var zip = new AdmZip(src);

  zip.extractAllTo(destFolder, true);

  console.log('Unziped to: ', destFolder);
  return destFolder;
});

exports.pack = function() {

};