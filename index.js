/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/reflect-own-keys-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/reflect-own-keys-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/reflect-own-keys-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/reflect-own-keys-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/reflect-own-keys-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/reflect-own-keys-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/reflect-own-keys-x" title="npm version">
 * <img src="https://badge.fury.io/js/reflect-own-keys-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Sham for Reflect.ownKeys.
 *
 * Requires ES3 or above.
 *
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module reflect-own-keys-x
 */

/* eslint strict: 1, max-statements: 1 */

/* global module */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var hasReflect = require('has-reflect-support-x');
  var assertIsObject = require('assert-is-object-x');
  var objectKeys = Object.keys || require('object-keys');
  var reflectOwnKeys = hasReflect && Reflect.ownKeys;

  if (reflectOwnKeys) {
    try {
      var k = reflectOwnKeys({ a: 1, b: 2 });
      if (k.length !== 2 || k[0] !== 'a' || k[1] !== 'b') {
        throw new Error('Inavlid result');
      }
    } catch (ignore) {
      reflectOwnKeys = null;
    }
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
   * @param {*} target The target object from which to get the own keys.
   * @throws {TypeError} If target is not an Object.
   * @return {Object} An Array of the target object's own property keys.
   * @example
   * var reflectOwnKeys = require('reflect-own-keys-x');
   * reflectOwnKeys({ a: 1, b: 2 }); // ['a', 'b']
   */
  module.exports = reflectOwnKeys;
}());
