import _ from 'lodash';

const buildAst = (before, after) => {
  const allKeys = _.union([...Object.keys(before), ...Object.keys(after)]).sort();
  return allKeys.map(
    (key) => {
      let status = 'unchanged';
      const beforeValue = before[key];
      const afterValue = after[key];
      if (_.isObject(beforeValue) && _.isObject(afterValue)) {
        status = 'nested';
        const children = buildAst(before[key], after[key]);
        return { key, status, afterValue: children };
      }

      if (beforeValue !== afterValue) {
        status = 'changed';
      }

      if (!_.has(after, [key])) {
        status = 'removed';
      }

      if (!_.has(before, [key])) {
        status = 'added';
      }

      return {
        key,
        beforeValue,
        afterValue,
        status,
      };
    },
  );
};

export default buildAst;
