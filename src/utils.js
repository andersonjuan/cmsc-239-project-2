// you can put util functions here if you want
import {sports} from './constants.js'
export function categorizeBy(data, groupByKey, sumByKey) {
  return data.reduce((accum, d) => {
    const groupV = d[groupByKey];
    const sumV = d[sumByKey];

    if (accum[groupV] === undefined) {
      accum[groupV] = {};
    }
    if (accum[groupV][sumV] === undefined) {
      accum[groupV][sumV] = [];
    }
    accum[groupV][sumV].push(d);

    return accum;
  }, {});
}

export function countBy(data, countKey) {
  return data.reduce((accum, d) => {
    const value = d[countKey];
    if (accum[value] === undefined) {
      accum[value] = 0;
    }
    accum[value]++;
    return accum;
  }, {});
}

export function grabBy(data, key, target) {
  return data.filter(d => {
    return (d[key] === target) ? 1 : 0;
  });
}

export function getStats(data, key) {
  const stats = data.reduce((accum, d) => {
    const newValue = Number(d[key]);
    if (newValue < accum.min) {
      accum.min = newValue;
    }

    if (newValue > accum.max) {
      accum.max = newValue;
    }

    accum.count++;
    accum.sum += newValue;

    return accum;
  }, {min: Infinity, max: -Infinity, count: 0, sum: 0});
  stats.mean = stats.sum / stats.count;
  return stats;
}

export function getCatRange(data, key) {
  const values = data.reduce((accum, d) => {
    const v = d[key];
    if (accum[v] === undefined) {
      accum[v] = 1;
    }

    return accum;
  }, {});
  return Object.keys(values);
}

// Source: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createEmptySportsDict() {
  return sports.reduce((accum, d) => {
    accum[capitalizeFirstLetter(d.toLowerCase())] = 0
    return accum;
  } , {});
}

// Source : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
