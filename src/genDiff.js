import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import getData from './parse.js';

export default (path1, path2) => {
  const firstFile = fs.readFileSync(path.resolve(process.cwd(), path1));
  const secondFile = fs.readFileSync(path.resolve(process.cwd(), path2));
  const firstParsed = getData(firstFile, path.extname(path1));
  const secondParsed = getData(secondFile, path.extname(path2));
  const allKeys = _.uniq([...Object.keys(firstParsed), ...Object.keys(secondParsed)]).sort();
  const result = allKeys.reduce((acc, el) => {
    if (!_.has(secondParsed, el)) {
      return [...acc, `  - ${el}: ${firstParsed[el]}`];
    }
    if (!_.has(firstParsed, el)) {
      return [...acc, `  + ${el}: ${secondParsed[el]}`];
    }
    if (_.has(secondParsed, el)) {
      if (secondParsed[el] !== firstParsed[el]) {
        return [
          ...acc,
          `  - ${el}: ${firstParsed[el] ?? false}`,
          `  + ${el}: ${secondParsed[el]}`,
        ];
      }
    }
    return [
      ...acc,
      `    ${el}: ${firstParsed[el]}`,
    ];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
