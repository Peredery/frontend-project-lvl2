import stylishRender from './stylish.js';
import plainRender from './plain.js';
import jsonRender from './json.js';

const renderDispatch = {
  stylish: stylishRender,
  plain: plainRender,
  json: jsonRender,
};

const render = (format, ast) => {
  const renderMethod = renderDispatch[format];
  if (renderMethod === undefined) return new Error(`doesn't support this format: ${format}`);
  return renderMethod(ast);
};

export default render;
