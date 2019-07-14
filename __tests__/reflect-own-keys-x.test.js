let reflectOwnKeys;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  reflectOwnKeys = require('../../index.js');
} else {
  reflectOwnKeys = returnExports;
}

const hasSymbols = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const ifSymbolsIt = hasSymbols ? it : xit;

describe('reflectOwnKeys', function() {
  it('is a function', function() {
    expect(typeof reflectOwnKeys).toBe('function');
  });

  it('throws if the target isn’t an object', function() {
    expect(function() {
      reflectOwnKeys();
    }).toThrow();

    expect(function() {
      reflectOwnKeys(void 0);
    }).toThrow();

    expect(function() {
      reflectOwnKeys(null);
    }).toThrow();

    expect(function() {
      reflectOwnKeys(1);
    }).toThrow();

    expect(function() {
      reflectOwnKeys(true);
    }).toThrow();

    expect(function() {
      reflectOwnKeys('');
    }).toThrow();
  });

  it('should return the same result as Object.getOwnPropertyNames if there are no Symbols', function() {
    const obj = {bar: 1, foo: 2};
    obj[1] = 'first';
    const result = Object.getOwnPropertyNames(obj);
    // Reflect.ownKeys depends on the implementation of
    // Object.getOwnPropertyNames, at least for non-symbol keys.
    expect(reflectOwnKeys(obj)).toStrictEqual(result);
    // We can only be sure of which keys should exist.
    expect(result.sort()).toStrictEqual(['1', 'bar', 'foo']);
  });

  ifSymbolsIt('symbols come last', function() {
    const s = Symbol('');
    const o = {'non-symbol': true};
    o[s] = true;
    expect(reflectOwnKeys(o)).toStrictEqual(['non-symbol', s]);
  });
});
