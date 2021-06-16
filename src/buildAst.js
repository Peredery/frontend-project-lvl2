import _ from 'lodash';

const buildAst = (before, after) => {
  const allKeys = _.sortBy(_.union(Object.keys(before), Object.keys(after)));
  return allKeys.map(
    (key) => {
      const beforeValue = before[key];
      const afterValue = after[key];
      if (!_.has(before, key)) {
        return {
          key, type: 'added', beforeValue, value: afterValue,
        };
      }
      if (!_.has(after, key)) {
        return {
          key, type: 'removed', beforeValue, value: afterValue,
        };
      }
      if (_.isPlainObject(beforeValue) && _.isPlainObject(afterValue)) {
        return { key, type: 'nested', children: buildAst(beforeValue, afterValue) };
      }
      if (!_.isEqual(beforeValue, afterValue)) {
        return {
          key, type: 'changed', beforeValue, value: afterValue,
        };
      }
      return { key, type: 'unchanged', value: afterValue };
    },
  );
};

export default buildAst;
