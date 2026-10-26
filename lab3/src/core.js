function isInteger(n) {
  return (n | 0) === n;
}

function even() {
  const result = [];
  for (let i = 2; i <= 20; i += 2) result.push(i);
  return result;
}

function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

function recSumTo(n) {
  return n <= 1 ? n : n + recSumTo(n - 1);
}

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function isBinary(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

function getOperationFn(initialValue, operatorFn) {
  let value = initialValue;

  return (newValue) => {
    if (typeof operatorFn !== 'function') return initialValue;
    return (value = operatorFn(value, newValue));
  };
}

function sequence(start = 0, step = 1) {
  let current = start;

  return () => {
    const value = current;
    current += step;
    return value;
  };
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) =>
    Object.prototype.hasOwnProperty.call(b, key) && deepEqual(a[key], b[key])
  );
}

module.exports = {
  isInteger,
  even,
  sumTo,
  recSumTo,
  factorial,
  isBinary,
  fibonacci,
  getOperationFn,
  sequence,
  deepEqual,
};