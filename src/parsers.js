import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (file, fileFormat) => {
  const parse = parsers[fileFormat];
  return parse(file);
};
