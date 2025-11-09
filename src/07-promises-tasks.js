function willYouMarryMe(isPositiveAnswer) {
  return new Promise((resolve, reject) => {
    if (typeof isPositiveAnswer !== 'boolean') {
      reject(new Error('Wrong parameter is passed! Ask her again.'));
    } else if (isPositiveAnswer) {
      resolve('Hooray!!! She said "Yes"!');
    } else {
      resolve('Oh no, she said "No".');
    }
  });
}

function processAllPromises(array) {
  return Promise.all(array);
}

function getFastestPromise(array) {
  return Promise.race(array);
}

function chainPromises(array, action) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;

    array.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = value;
          completed += 1;
          if (completed === array.length) {
            resolve(results.reduce(action));
          }
        })
        .catch(() => {
          completed += 1;
          if (completed === array.length) {
            resolve(results.reduce(action));
          }
        });
    });
  });
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
