var Packing = require('./packing');
var Image = require('./image');
var util = require('./util');
var R = require("ramda");
var fs = require("fs");
var h5p = require("./h5p");

/**
 * Unzips a h5p to the tmp folder
 *
 * @type {Function}
 * @private
 * @param {String[]} filePaths
 * @return {String[]} tmp directories created
 */
const unzipToTmpFolders = R.map(Packing.unpack('./tmp/unpacked'));

/**
 * Downloads images to the tmp folder
 *
 * @type {Function}
 * @private
 * @param {String[]} image paths
 */
const downloadToImageFolder = R.map(Image.download('./tmp/images'));

/**
 * Performs the migration
 */
exports.execute = function() {
  var fileNames = ['./h5ps/gjenkjenn-utsnitt-kameravinkler-og-linjer-2-170366.h5p'];
  var images = ['/sites/default/files/images/tom_knudsen_fotosjangere_barn.jpg'];

  // unzip to filesystem
  //var tmpFolders = unzipToTmpFolders(fileNames);

  var contentMetaData = util.readFileAsJson('./tmp/unpacked/gjenkjenn-utsnitt-kameravinkler-og-linjer-2-170366.h5p/content/content.json');

  var imageUrls = R.filter(util.hasImageFileEnding, h5p.findUrls(contentMetaData));

  downloadToImageFolder(imageUrls);

  console.log('Finished');
};