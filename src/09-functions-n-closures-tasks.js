function getComposition(f, g) {
  return function composed(x) {
    return f(g(x));
  };
}

function getPowerFunction(exponent) {
  return function power(x) {
    return x ** exponent;
  };
}

function getPolynom(...coefficients) {
  if (coefficients.length === 0) {
    return null;
  }

  return function polynom(x) {
    let result = 0;
    for (let i = 0; i < coefficients.length; i += 1) {
      const power = coefficients.length - 1 - i;
      result += coefficients[i] * (x ** power);
    }
    return result;
  };
}

function memoize(func) {
  let cachedResult;
  let hasCached = false;

  return function memoized() {
    if (!hasCached) {
      cachedResult = func();
      hasCached = true;
    }
    return cachedResult;
  };
}

function retry(func, attempts) {
  return function retryer() {
    let lastError;

    for (let i = 0; i < attempts; i += 1) {
      try {
        return func();
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  };
}

function logger(func, logFunc) {
  return function logged(...args) {
    const argsString = args.map((arg) => JSON.stringify(arg)).join(',');
    logFunc(`${func.name}(${argsString}) starts`);

    const result = func.apply(this, args);

    logFunc(`${func.name}(${argsString}) ends`);

    return result;
  };
}

function partialUsingArguments(fn, ...args1) {
  return function partiallyApplied(...args2) {
    return fn(...args1, ...args2);
  };
}

function getIdGeneratorFunction(startFrom) {
  let current = startFrom;

  return function getId() {
    const result = current;
    current += 1;
    return result;
  };
}

module.exports = {
  getComposition,
  getPowerFunction,
  getPolynom,
  memoize,
  retry,
  logger,
  partialUsingArguments,
  getIdGeneratorFunction,
};
