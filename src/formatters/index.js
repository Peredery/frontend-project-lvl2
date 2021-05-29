import stylishRender from './stylish.js';
import plainRender from './plain.js';
import jsonRender from './json.js';

const renderDispatch = {
  stylish: stylishRender,
  plain: plainRender,
  json: jsonRender,
};

const render = (format, ast) => renderDispatch[format](ast);

export default render;
