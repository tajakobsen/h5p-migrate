var fs = require("fs");
var R = require("ramda");
var util = require("./util");

/**
 *  Adds the value
 *
 * @param {*} value
 * @param {String[]} arr
 * @return {String[]}
 */
var keepIfUrl = function (arr, value) {
  return R.concat(arr, util.isUrl(value) ? [value] : []);
};

/**
 * Takes values from an object, and groups them by type
 *
 * @example
 * var x = {a: 1, b: 'a'}
 * // => {"Number": [1], "String": ["a"]}
 * @param {Array}
 * @param {Object}
 */
var groupValuesByType = R.compose(R.groupBy(R.type), R.values);

/**
 *
 * @function
 * @param {Object} obj
 * @return {String[]}
 */
var findUrls = function(obj) {
  const valuesByTypes = groupValuesByType(obj);

  // sort values ty type
  const stringValues = R.prop('String', valuesByTypes) || [];
  var objectValues = R.prop('Object', valuesByTypes) || [];
  var arrayValues = R.prop('Array', valuesByTypes) || [];
  arrayValues = R.filter(R.is(Object), arrayValues);
  objectValues = R.concat(objectValues, arrayValues);

  // check strings, call object recurivly
  const urls1 = R.reduce(keepIfUrl, [], stringValues);
  const urls2 = R.flatten(R.map(findUrls, objectValues));

  return R.concat(urls1, urls2);
};

exports.findUrls = findUrls;