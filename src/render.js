const renderMap = {
  added: (value, depth) => (`+ ${value}`),
  removed: (value, depth) => (`- ${value}`),
  changed: (value, depth) => (`${renderMap.remove(value, depth)}\n${renderMap.add(value, depth)}`),
  unchanged: (value, depth) => (`${value}`),
  nested: (value, depth) => ('children'),
};

const render = (ast) => {
  const iter = (iterAst, depth) => {
    const result = iterAst.map((node) => {
      return renderMap[node.status](node.value, depth);
    });
    return ['{', ...result, '}'].join('\n');
  };
  return iter(ast, 0);
};

export default render;
