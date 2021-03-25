import _ from 'lodash';
import path from 'path';
import fs from 'fs';

export default (path1, path2) => {
  const file1 = fs.readFileSync(path.resolve(process.cwd(), path1));
  const file2 = fs.readFileSync(path.resolve(process.cwd(), path2));
  const firstJson = JSON.parse(file1);
  const secondJson = JSON.parse(file2);
  const allKeys = _.uniq([...Object.keys(firstJson), ...Object.keys(secondJson)]).sort();
  const result = allKeys.reduce((acc, el) => {
    if (!_.has(secondJson, el)) {
      return [...acc, `   - ${el} : ${firstJson[el]}`];
    }
    if (_.has(secondJson, el)) {
      if (secondJson[el] !== firstJson[el]) {
        return [
          ...acc,
          `   - ${el} : ${firstJson[el] ?? false}`,
          `   + ${el} : ${secondJson[el]}`,
        ];
      }
    }
    return [
      ...acc,
      `   ${el} : ${firstJson[el] ?? false}`,
    ];
  }, []);
  return `{\n${result.join('\n')}\n}`;
};
