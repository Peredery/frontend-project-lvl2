import yaml from 'js-yaml';

const getParser = {
  '.json': JSON.parse,
  '.yml': yaml.load,
};

export default (file, extname) => {
  const parse = getParser[extname];
  return parse(file);
};
