const nativeOwnKeys = require('has-reflect-support-x') && typeof Reflect.ownKeys === 'function' && Reflect.ownKeys;

let isWorking;

if (nativeOwnKeys) {
  const attempt = require('attempt-x');
  const isArray = require('is-array-x');
  const isCorrectRes = function _isCorrectRes(r, length) {
    return r.threw === false && isArray(r.value) && r.value.length === length;
  };

  const either = function _either(r, a, b) {
    const x = r.value[0];
    const y = r.value[1];

    return (x === a && y === b) || (x === b && y === a);
  };

  let res = attempt(nativeOwnKeys, 1);
  isWorking = res.threw;

  if (isWorking) {
    res = attempt(nativeOwnKeys, {a: 1, b: 2});
    isWorking = isCorrectRes(res, 2) && either(res, 'a', 'b');
  }

  if (isWorking && require('has-symbol-support-x')) {
    const symbol = Symbol('');
    const testObj = {a: 1};
    testObj[symbol] = 2;
    res = attempt(nativeOwnKeys, testObj);
    isWorking = isCorrectRes(res, 2) && either(res, 'a', symbol);
  }
}

let reflectOwnKeys;

if (isWorking) {
  reflectOwnKeys = nativeOwnKeys;
} else {
  const assertIsObject = require('assert-is-object-x');
  const getOwnPropertyNames = require('get-own-property-names-x');
  const getOwnPropertySymbols = require('get-own-property-symbols-x');
  const {concat} = Array.prototype;

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
 * @returns {object} An Array of the target object's own property keys.
 */
export default reflectOwnKeys;
