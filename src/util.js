var R = require("ramda"),
    fs = require("fs");

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
 * Reads a file, parse it as json, and return object
 *
 * @param {String} path The path of the file to read
 * @return {Object} json-object in file
 */
exports.readFileAsJson = function(path){
  return JSON.parse(fs.readFileSync(path, 'utf8'));
};

/**
 * Reads the secret.conf file, and returns the auth param
 */
exports.getAuth = function () {
  return exports.readFileAsJson('./secret.json').auth;
};