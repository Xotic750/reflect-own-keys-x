let reflectOwnKeys;

const hasSymbols = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const ifSymbolsIt = hasSymbols ? it : xit;

describe('reflectOwnKeys', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof reflectOwnKeys).toBe('function');
  });

  it('throws if the target isn’t an object', function() {
    expect.assertions(1);
    expect(function() {
      reflectOwnKeys();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      reflectOwnKeys(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      reflectOwnKeys(null);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      reflectOwnKeys(1);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      reflectOwnKeys(true);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      reflectOwnKeys('');
    }).toThrowErrorMatchingSnapshot();
  });

  it('should return the same result as Object.getOwnPropertyNames if there are no Symbols', function() {
    expect.assertions(1);
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
