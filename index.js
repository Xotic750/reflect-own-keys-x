/**
 * @file Sham for Reflect.ownKeys
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module reflect-own-keys-x
 */

'use strict';

var hasReflect = require('has-reflect-support-x');
var assertIsObject = require('assert-is-object-x');
var objectKeys = require('object-keys-x');
var reflectOwnKeys = hasReflect && Reflect.ownKeys;

if (reflectOwnKeys) {
  try {
    var k = reflectOwnKeys({ a: 1, b: 2 });
    if (k.length !== 2 || k[0] !== 'a' || k[1] !== 'b') {
      throw new Error('Inavlid result');
    }
  } catch (ignore) {}
}

if (reflectOwnKeys) {
  reflectOwnKeys = function ownKeys(target) {
    assertIsObject(target);
    var keys = Object.getOwnPropertyNames ? Object.getOwnPropertyNames(target) : objectKeys(target);
    return Object.getOwnPropertySymbols ? keys.concat(Object.getOwnPropertySymbols(target)) : keys;
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
