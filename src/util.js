var R = require("ramda");

/**
 * Parses a path or url for the file name.
 *
 * @type {Function}
 * @return {String} the file name
 */
exports.parseFileName = R.compose(R.head, R.match(/([^\/]+)\.[^\/]+$/));