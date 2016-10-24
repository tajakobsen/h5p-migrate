var fs = require("fs");
var R = require("ramda");

/**
 * If input is a String, check if it's a url
 *
 * @function
 * @private
 * @type {Function}
 * @param {String}
 * @return {Boolean} if input is a url
 */
var isUrl = R.both(R.is(String), R.match(/^(https?:\/\/)/));

/**
 *  Adds the value
 *
 * @param {*} value
 * @param {String[]} arr
 * @return {String[]}
 */
var addIfUrl = function(value, arr){
  if(isUrl(value)){
    return R.append(value, arr);
  } else {
    return arr;
  }
};

/**
 *
 * @function
 * @param {Object} contentMetaData
 * @return
 */
var findUrls = function(contentMetaData) {
  var values = R.values(contentMetaData);

  R.reduce(addIfUrl, [], values);
};

exports.findUrls = findUrls;