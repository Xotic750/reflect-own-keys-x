function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var rok = Reflect.ownKeys;
var nativeOwnKeys = hasSymbolSupport && typeof rok === 'function' && rok;
var concat = methodize([].concat);

var isCorrectRes = function isCorrectRes(r, length) {
  return r.threw === false && isArray(r.value) && r.value.length === length;
};

var either = function either(args) {
  var _args = _slicedToArray(args, 3),
      r = _args[0],
      a = _args[1],
      b = _args[2];

  var x = r.value[0];
  var y = r.value[1];
  return x === a && y === b || x === b && y === a;
};

var test1 = function test1() {
  return attempt(nativeOwnKeys, 1).threw;
};

var test2 = function test2() {
  var res = attempt(nativeOwnKeys, {
    a: 1,
    b: 2
  });
  return isCorrectRes(res, 2) && either([res, 'a', 'b']);
};

var test3 = function test3() {
  if (hasReflectSupport) {
    /* eslint-disable-next-line compat/compat */
    var symbol = Symbol('');
    var testObj = {
      a: 1
    };
    testObj[symbol] = 2;
    var res = attempt(nativeOwnKeys, testObj);
    return isCorrectRes(res, 2) && either([res, 'a', symbol]);
  }

  return true;
};

var isWorking = toBoolean(nativeOwnKeys) && test1() && test2() && test3();
export var implementation = function ownKeys(target) {
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

var reflectOwnKeys = isWorking ? nativeOwnKeys : implementation;
export default reflectOwnKeys;

//# sourceMappingURL=reflect-own-keys-x.esm.js.map