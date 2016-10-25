var Packing = require('./packing');
var Image = require('./image');
var Util = require('./util');
var R = require("ramda");
var fs = require("fs");
var h5p = require("./h5p");

/**
 * Unzips a h5p to the tmp directory
 *
 * @type {Function}
 * @private
 * @param {String[]} filePaths
 * @return {String[]} tmp directories created
 */
const unzipToTmpDirectory = R.map(Packing.unpack('./tmp/unpacked'));

/**
 * Downloads images to the tmp directory
 *
 * @type {Function}
 * @private
 * @param {String[]} image paths
 */
const downloadToImageDirectory = R.map(Image.download('./tmp/images'));

/**
 * Returns relative paths to all files in a directory
 *
 * @param basePath The directory
 * @return {String[]} List of relative paths
 */
const getFilePaths = function(basePath){
  return R.map(fileName => basePath + fileName, fs.readdirSync(basePath))
};

/**
 * Get all file paths in a directory, and filter to keep h5p files
 *
 * @param basePath The directory to check
 * @return {String[]} List of relative paths to h5ps
 */
const getH5psInDirectory = R.compose(R.filter(Util.hasH5PFileEnding), getFilePaths);

/**
 *
 * @param h5pTmpDirectory
 */
const migrateSingleH5p = function(h5pTmpDirectory){
  // reads content.json
  var contentFileData = Util.readH5pContentJsonFile(h5pTmpDirectory);

  // scrape for all image urls
  var imageUrls = R.filter(Util.hasImageFileEnding, h5p.findUrls(contentFileData));

  // download images
  downloadToImageDirectory(imageUrls);
};

/**
 * Performs the migration
 */
exports.execute = function() {
  // get paths to all h5p files
  var filePaths = getH5psInDirectory('./h5ps/');

  // unzip to filesystem
  var tmpFolders = unzipToTmpDirectory(filePaths);

  // Iterates over unzipped h5ps, and
  R.forEach(migrateSingleH5p, tmpFolders);

  console.log('Finished');
};