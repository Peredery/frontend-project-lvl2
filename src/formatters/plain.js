import _ from 'lodash';

const serialize = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const render = (iterAst, path = []) => {
  const result = _.compact(iterAst.map((node) => {
    const curPath = [...path, node.key].join('.');
    switch (node.type) {
      case 'added':
        return `Property '${curPath}' was added with value: ${serialize(node.value)}`;
      case 'removed':
        return `Property '${curPath}' was removed`;
      case 'changed':
        return `Property '${curPath}' was updated. From ${serialize(node.beforeValue)} to ${serialize(node.value)}`;
      case 'nested':
        return render(node.children, [...path, node.key]);
      default:
        return '';
    }
  }));
  return result.join('\n');
};

export default render;
