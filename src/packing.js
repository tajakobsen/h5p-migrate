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
