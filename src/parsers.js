import yaml from 'js-yaml';

const Parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

export default (file, fileFormat) => {
  const parse = Parsers[fileFormat];
  return parse(file);
};
