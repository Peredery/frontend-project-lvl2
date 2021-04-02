/* eslint-disable no-trailing-spaces,no-multiple-empty-lines */
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import getData from './parse.js';

const buildAst = (before, after) => {
  const allKeys = _.intersection([...Object.keys(before), ...Object.keys(after)]).sort();
  console.log(allKeys);
  return allKeys.reduce(
    (acc, el) => {
      let status = '';
      const key = el;
      const valueBefore = before[key];
      const valueAfter = after[key];
      let value = '';
      const children = [];
      if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
        value = 'nested';
      }
      if (!_.has(valueAfter, [key])) {
        console.log(key);
        status = 'removed';
      }

      return [
        ...acc,
        {
          key,
          value,
          status,
          children,
        },
      ];
    }, [],
  );
};

export default (path1, path2, format = 'stylish') => {
  const firstFile = fs.readFileSync(path.resolve(process.cwd(), path1));
  const secondFile = fs.readFileSync(path.resolve(process.cwd(), path2));
  const firstParsed = getData(firstFile, path.extname(path1));
  const secondParsed = getData(secondFile, path.extname(path2));
  const ast = buildAst(firstParsed, secondParsed);
  console.log(JSON.stringify(ast, null, 2));
  // const result = allKeys.reduce((acc, el) => {
  //   if (!_.has(secondParsed, el)) {
  //     return [...acc, `  - ${el}: ${firstParsed[el]}`];
  //   }
  //   if (!_.has(firstParsed, el)) {
  //     return [...acc, `  + ${el}: ${secondParsed[el]}`];
  //   }
  //   if (_.has(secondParsed, el)) {
  //     if (secondParsed[el] !== firstParsed[el]) {
  //       return [
  //         ...acc,
  //         `  - ${el}: ${firstParsed[el] ?? false}`,
  //         `  + ${el}: ${secondParsed[el]}`,
  //       ];
  //     }
  //   }
  //   return [
  //     ...acc,
  //     `    ${el}: ${firstParsed[el]}`,
  //   ];
  // }, []);
  // return `{\n${result.join('\n')}\n}`;
};
