var R = require("ramda");
var util = require("./util");

/**
 * Traverses an object tree, and
 *
 * @param func
 * @param obj
 */
const traverseObject = R.curry(function(func, obj){
  var result = [];

  for(var key in obj) {
    var value = obj[key];

    // If object
    if(R.is(Object, value)){
      result = R.concat(result, traverseObject(func, value));
    }
    // If array
    else if(R.is(Array, value)){
      result = R.concat(result, R.map(traverseObject, value));
    }
    // of other
    else {
      result = R.append(func(value, key, obj), result);
    }
  }

  return result;
});

/**
 * Returns the string if it's a url, else undefined
 *
 * @param value
 * @returns {String|undefined}
 */
const toUrl = value => util.isUrl(value) ? value : undefined;

/**
 * Returns an array of all urls
 *
 * @function
 * @param {Object} obj
 * @return {String[]}
 */
const findUrls = traverseObject(toUrl);

/**
 * Traverses an object, and updates the domain
 *
 * @param {String} the old url that should be replaced
 * @param {String} the new url
 * @param {Object} The content.json
 */
const updateUrls = R.curry(function(oldDomain, newDomain, obj){
  const replaceUrl = R.replace(oldDomain, newDomain);

  traverseObject((value, key, obj) => {
    if(util.isUrl(value)) {
      obj[key] = replaceUrl(value);
    }
  }, obj);
});

exports.updateUrls = updateUrls;
exports.findUrls = findUrls;