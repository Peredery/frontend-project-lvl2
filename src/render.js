/* eslint-disable default-case */
/* eslint-disable arrow-body-style */
import _ from 'lodash';

const render = (ast) => {
  const iter = (iterAst, depth) => {
    const result = iterAst.map((node) => {
      const { key, beforeValue, afterValue, status } = node;
      switch (status) {
        case 'added':
          return `+ ${key}: `;
        case 'removed':
          return `- ${key}`;
        case 'changed':
          return `ssssss`
      }
      if (_.isObject(afterValue)) {
        console.log(afterValue);
        return iter(node, depth + 1);
      }
    });
    return ['{', ...result, `${' '.repeat(depth)}}`].join('\n');
  };
  return iter(ast, 0);
};

export default render;
