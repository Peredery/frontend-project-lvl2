import _ from 'lodash';

const buildAst = (before, after) => {
  const allKeys = _.sortBy(_.union([...Object.keys(before), ...Object.keys(after)]));
  return allKeys.map(
    (key) => {
      const beforeValue = before[key];
      const afterValue = after[key];
      if (!_.has(before, key)) {
        return {
          key,
          status: 'added',
          beforeValue,
          value: afterValue,
        };
      }
      if (!_.has(after, key)) {
        return {
          key,
          status: 'removed',
          beforeValue,
          value: afterValue,
        };
      }
      if (_.isObject(beforeValue) && _.isObject(afterValue)) {
        return {
          key,
          status: 'nested',
          children: buildAst(beforeValue, afterValue),
        };
      }
      if (!_.isEqual(beforeValue, afterValue)) {
        return {
          key,
          status: 'changed',
          beforeValue,
          value: afterValue,
        };
      }
      return {
        key,
        status: 'unchanged',
        value: afterValue,
      };
    },
  );
};

export default buildAst;
