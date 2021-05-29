import _ from 'lodash';

const space = (depth) => '    '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;
  const rows = _.keys(value).map((key) => `${space(depth + 1)}    ${key}: ${stringify(value[key], depth + 1)}`).join('\n');
  return `{\n${rows}\n${space(depth + 1)}}`;
};

const renderMap = {
  added: (node, depth) => (`${space(depth)}  + ${node.key}: ${stringify(node.value, depth)}`),
  removed: (node, depth) => (`${space(depth)}  - ${node.key}: ${stringify(node.beforeValue, depth)}`),
  changed: (node, depth) => (`${renderMap.removed(node, depth)}\n${renderMap.added(node, depth)}`),
  unchanged: (node, depth) => (`${space(depth)}    ${node.key}: ${stringify(node.value, depth)}`),
  // nested: (node, depth) => `${space(depth)}    ${node.key}: ${iter(node.children, depth + 1)}`,
};

const iter = (iterAst, depth) => {
  const result = iterAst.map((node) => {
    if (node.status === 'nested') {
      return `${space(depth)}    ${node.key}: ${iter(node.children, depth + 1)}`;
    }
    return renderMap[node.status](node, depth);
  });
  return ['{', ...result, `${space(depth)}}`].join('\n');
};

const render = (ast) => iter(ast, 0);

export default render;
