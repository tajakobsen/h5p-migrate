var R = require("ramda"),
    fs = require("fs");

/**
 * Reads a file, parse it as json, and return object
 *
 * @param {String} path The path of the file to read
 * @return {Object} json-object in file
 */
const readFileAsJson = function(path){
  return JSON.parse(fs.readFileSync(path, 'utf8'));
};


/**
 * Parses a path or url for the file name.
 *
 * @type {Function}
 * @return {String} the file name
 */
exports.parseFileName = R.compose(R.head, R.match(/([^\/]+)\.[^\/]+$/));

/**
 * If a string is a url
 *
 * @function
 * @private
 * @type {Function}
 * @param {String}
 * @return {Boolean} if string is a url
 */
exports.isUrl = R.test(/^(https?:\/\/)/);

/**
 * Check if a file path as an image ending
 *
 * @param {String} path
 * @return {Boolean} if string is an image path
 */
exports.hasImageFileEnding = R.test(/\.(gif|jpg|jpeg|tiff|png)$/i);

/**
 * Check if a file path as an image ending
 *
 * @param {String} path
 * @return {Boolean} if string is an image path
 */
exports.hasH5PFileEnding = R.test(/\.(h5p)$/i);

/**
 * Reads the secret.conf file, and returns the auth param
 */
exports.getConfig = function () {
  return readFileAsJson('./config.json');
};

/**
 * Reads a content.json file from a h5p tmp directory
 *
 * @param h5pTmpDirectory
 * @return {Object}
 */
exports.readH5pContentJsonFile = function(h5pTmpDirectory){
  return readFileAsJson(h5pTmpDirectory + '/content/content.json');
};


exports.writeH5pContentJsonFile = function(h5pTmpDirectory, content){
  return fs.writeFileSync(h5pTmpDirectory + '/content/content.json', JSON.stringify(content));
};