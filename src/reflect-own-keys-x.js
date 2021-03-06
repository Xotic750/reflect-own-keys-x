import attempt from 'attempt-x';
import isArray from 'is-array-x';
import hasSymbolSupport from 'has-symbol-support-x';
import hasReflectSupport from 'has-reflect-support-x';
import assertIsObject from 'assert-is-object-x';
import getOwnPropertyNames from 'get-own-property-names-x';
import getOwnPropertySymbols from 'get-own-property-symbols-x';
import toBoolean from 'to-boolean-x';
import methodize from 'simple-methodize-x';

/* eslint-disable-next-line compat/compat */
const rok = Reflect.ownKeys;
const nativeOwnKeys = hasSymbolSupport && typeof rok === 'function' && rok;
const concat = methodize([].concat);

const isCorrectRes = function isCorrectRes(r, length) {
  return r.threw === false && isArray(r.value) && r.value.length === length;
};

const either = function either(args) {
  const [r, a, b] = args;
  const x = r.value[0];
  const y = r.value[1];

  return (x === a && y === b) || (x === b && y === a);
};

const test1 = function test1() {
  return attempt(nativeOwnKeys, 1).threw;
};

const test2 = function test2() {
  const res = attempt(nativeOwnKeys, {a: 1, b: 2});

  return isCorrectRes(res, 2) && either([res, 'a', 'b']);
};

const test3 = function test3() {
  if (hasReflectSupport) {
    /* eslint-disable-next-line compat/compat */
    const symbol = Symbol('');
    const testObj = {a: 1};
    testObj[symbol] = 2;
    const res = attempt(nativeOwnKeys, testObj);

    return isCorrectRes(res, 2) && either([res, 'a', symbol]);
  }

  return true;
};

const isWorking = toBoolean(nativeOwnKeys) && test1() && test2() && test3();

export const implementation = function ownKeys(target) {
  assertIsObject(target);

  return concat(getOwnPropertyNames(target), getOwnPropertySymbols(target));
};

/**
 * This method returns an array of the target object's own property keys.
 * Its return value is equivalent to Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target)).
 *
 * @param {*} target - The target object from which to get the own keys.
 * @throws {TypeError} If target is not an Object.
 * @returns {object} An Array of the target object's own property keys.
 */
const reflectOwnKeys = isWorking ? nativeOwnKeys : implementation;

export default reflectOwnKeys;
