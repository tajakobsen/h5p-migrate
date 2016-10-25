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
 * @function
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
const migrateSingleH5p = R.curry(function(config, h5pTmpDirectory){
  // reads content.json
  var contentFileData = Util.readH5pContentJsonFile(h5pTmpDirectory);


  // scrape for all image urls
  var imageUrls = R.filter(Util.hasImageFileEnding, h5p.findUrls(contentFileData));


  // download images
  //downloadToImageDirectory(imageUrls, config.auth);

  // mutes contentFileData
  h5p.updateUrls(config.oldDomain, config.newDomain, contentFileData);

  Util.writeH5pContentJsonFile(h5pTmpDirectory, contentFileData);
});

/**
 * Performs the migration
 */
exports.execute = function() {
  var config = Util.getConfig();

  // get paths to all h5p files
  var filePaths = getH5psInDirectory('./h5ps/');

  // unzip to filesystem
  var tmpFolders = unzipToTmpDirectory(filePaths);

  // Iterates over unzipped h5ps, and
  R.forEach(migrateSingleH5p(config), tmpFolders);

  //Zip up files
  var h5pFile = 'gjenkjenn-utsnitt-kameravinkler-og-linjer-2-170366.h5p';
  var packed = Packing.pack('./tmp/unpacked/'+h5pFile, './tmp/packed/'+h5pFile);


  console.log('Finished');
};
