import _ from 'lodash';

const iter = (iterAst, path) => {
  const result = iterAst.map((node) => {
    const curPath = [...path, node.key].join('.');
    const serialize = (value) => {
      if (_.isObject(value)) return '[complex value]';
      return _.isString(value) ? `'${value}'` : value;
    };
    switch (node.status) {
      case 'added':
        return `Property '${curPath}' was added with value: ${serialize(node.value)}`;
      case 'removed':
        return `Property '${curPath}' was removed`;
      case 'changed':
        return `Property '${curPath}' was updated. From ${serialize(node.beforeValue)} to ${serialize(node.value)}`;
      case 'nested':
        return iter(node.children, [...path, node.key]);
      default:
        return '';
    }
  });
  return result.filter((el) => el).join('\n');
};

const render = (ast) => iter(ast, []);

export default render;
