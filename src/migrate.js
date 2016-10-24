var Packing = require('./packing');
var Image = require('./image');
var R = require("ramda");
var h5p = require("./h5p");
var files = require("./files");

/**
 * Unzips a h5p to the tmp folder
 *
 * @type {Function}
 * @private
 * @param {String[]} filePaths
 * @return {String[]} tmp directories created
 */
var unzipToTmpFolders = R.map(Packing.unpack('./tmp/unpacked'));

/**
 * Downloads images to the tmp folder
 *
 * @type {Function}
 * @private
 * @param {String[]} image paths
 */
var downloadImages = R.map(Image.download('./tmp/images'));

exports.execute = function() {
  var fileNames = ['./h5ps/gjenkjenn-utsnitt-kameravinkler-og-linjer-2-170366.h5p'];
  var images = ['/sites/default/files/images/tom_knudsen_fotosjangere_barn.jpg'];

  // unzip to filesystem
  var tmpFolders = unzipToTmpFolders(fileNames);


  var contentMetaData = files.readFileAsJson('/home/tomaj/code/ndla/migrate/tmp/unpacked/gjenkjenn-utsnitt-kameravinkler-og-linjer-2-170366.h5p/content/content.json');

  // download images
  //downloadImages(images);

  console.log('Finished');
};