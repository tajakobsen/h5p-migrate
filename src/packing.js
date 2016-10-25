var fs = require("fs");
var AdmZip = require('adm-zip');
var R = require("ramda");
var Util = require('./util');
var zipFolder = require('zip-folder');



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

/**
 * Unpacks a h5p
 *
 * @type {Function}
 * @param {String} destination
 * @param {String} src
 * @return {String} destFolder
 */
exports.pack = function(src,dest) {

  console.log("packing ...");

  zipFolder(src, dest, function(err) {
      if(err) {
          console.log('oh no!', err);
      } else {
          console.log('Zipped!');
      }
  });

};
