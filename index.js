/**
 * @file Sham for Reflect.ownKeys
 * @version 1.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module reflect-own-keys-x
 */

'use strict';

var hasReflect = require('has-reflect-support-x');
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

if (Boolean(reflectOwnKeys) === false) {
  var assertIsObject = require('assert-is-object-x');
  var objectKeys = require('object-keys-x');
  var rDOP = require('reflect-define-property-x');
  var obj;
  var gOPN = typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames;
  if (gOPN) {
    obj = { a: 1 };
    rDOP(obj, 'b', {
      value: 2
    });

    try {
      var n = gOPN(obj);
      if (n.length !== 2 || n[0] !== 'a' || n[1] !== 'b') {
        throw new Error('Inavlid result');
      }
    } catch (ignore) {
      gOPN = null;
    }
  }

  var gOPS = typeof Object.getOwnPropertySymbols === 'function' && Object.getOwnPropertySymbols;
  if (gOPS) {
    var hasSymbolSupport = require('has-symbol-support-x');
    try {
      var symbol = hasSymbolSupport && Symbol('');
      obj = { a: 1 };
      if (symbol) {
        rDOP(obj, symbol, {
          value: 2
        });
      }

      var s = gOPS(obj);
      if (symbol) {
        // eslint-disable-next-line max-depth
        if (s.length !== 1 || s[0] !== symbol) {
          throw new Error('Inavlid result');
        }
      } else if (s.length !== 0) {
        throw new Error('Inavlid result');
      }
    } catch (ignore) {
      gOPS = null;
    }
  }

  reflectOwnKeys = function ownKeys(target) {
    assertIsObject(target);
    var keys = gOPN ? gOPN(target) : objectKeys(target);
    return gOPS ? keys.concat(gOPS(target)) : keys;
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
