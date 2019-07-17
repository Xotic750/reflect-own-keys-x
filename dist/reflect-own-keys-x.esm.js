import attempt from 'attempt-x';
import isArray from 'is-array-x';
import hasSymbolSupport from 'has-symbol-support-x';
import hasReflectSupport from 'has-reflect-support-x';
import assertIsObject from 'assert-is-object-x';
import getOwnPropertyNames from 'get-own-property-names-x';
import getOwnPropertySymbols from 'get-own-property-symbols-x';
/* eslint-disable-next-line compat/compat */

var nativeOwnKeys = hasSymbolSupport && typeof Reflect.ownKeys === 'function' && Reflect.ownKeys;
var isWorking;

if (nativeOwnKeys) {
  var isCorrectRes = function isCorrectRes(r, length) {
    return r.threw === false && isArray(r.value) && r.value.length === length;
  };

  var either = function either(r, a, b) {
    var x = r.value[0];
    var y = r.value[1];
    return x === a && y === b || x === b && y === a;
  };

  var res = attempt(nativeOwnKeys, 1);
  isWorking = res.threw;

  if (isWorking) {
    res = attempt(nativeOwnKeys, {
      a: 1,
      b: 2
    });
    isWorking = isCorrectRes(res, 2) && either(res, 'a', 'b');
  }

  if (isWorking && hasReflectSupport) {
    /* eslint-disable-next-line compat/compat */
    var symbol = Symbol('');
    var testObj = {
      a: 1
    };
    testObj[symbol] = 2;
    res = attempt(nativeOwnKeys, testObj);
    isWorking = isCorrectRes(res, 2) && either(res, 'a', symbol);
  }
}
/**
 * This method returns an array of the target object's own property keys.
 * Its return value is equivalent to Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target)).
 *
 * @param {*} target - The target object from which to get the own keys.
 * @throws {TypeError} If target is not an Object.
 * @returns {object} An Array of the target object's own property keys.
 */


var reflectOwnKeys;

if (isWorking) {
  reflectOwnKeys = nativeOwnKeys;
} else {
  var concat = [].concat;

  reflectOwnKeys = function ownKeys(target) {
    assertIsObject(target);
    return concat.call(getOwnPropertyNames(target), getOwnPropertySymbols(target));
  };
}

var rok = reflectOwnKeys;
export default rok;

//# sourceMappingURL=reflect-own-keys-x.esm.js.map