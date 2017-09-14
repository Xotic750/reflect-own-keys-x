/**
 * @file Sham for Reflect.ownKeys
 * @version 2.2.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module reflect-own-keys-x
 */

'use strict';

var nativeOwnKeys = require('has-reflect-support-x') && typeof Reflect.ownKeys === 'function' && Reflect.ownKeys;

var isWorking;
if (nativeOwnKeys) {
  var attempt = require('attempt-x');
  var isArray = require('is-array-x');
  var isCorrectRes = function _isCorrectRes(r, length) {
    return r.threw === false && isArray(r.value) && r.value.length === length;
  };

  var either = function _either(r, a, b) {
    var x = r.value[0];
    var y = r.value[1];
    return (x === a && y === b) || (x === b && y === a);
  };

  var res = attempt(nativeOwnKeys, 1);
  isWorking = res.threw;

  if (isWorking) {
    res = attempt(nativeOwnKeys, { a: 1, b: 2 });
    isWorking = isCorrectRes(res, 2) && either(res, 'a', 'b');
  }

  if (isWorking && require('has-symbol-support-x')) {
    var symbol = Symbol('');
    var testObj = { a: 1 };
    testObj[symbol] = 2;
    res = attempt(nativeOwnKeys, testObj);
    isWorking = isCorrectRes(res, 2) && either(res, 'a', symbol);
  }
}

var reflectOwnKeys;
if (isWorking) {
  reflectOwnKeys = nativeOwnKeys;
} else {
  var assertIsObject = require('assert-is-object-x');
  var getOwnPropertyNames = require('get-own-property-names-x');
  var getOwnPropertySymbols = require('get-own-property-symbols-x');
  var concat = Array.prototype.concat;

  reflectOwnKeys = function ownKeys(target) {
    assertIsObject(target);
    return concat.call(getOwnPropertyNames(target), getOwnPropertySymbols(target));
  };
}

/**
 * This method returns an array of the target object's own property keys.
 * Its return value is equivalent to
 * Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target)).
 *
 * @param {*} target - The target object from which to get the own keys.
 * @throws {TypeError} If target is not an Object.
 * @returns {Object} An Array of the target object's own property keys.
 * @example
 * var reflectOwnKeys = require('reflect-own-keys-x');
 * reflectOwnKeys({ a: 1, b: 2 }); // ['a', 'b']
 */
module.exports = reflectOwnKeys;
