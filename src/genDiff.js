import path from 'path';
import fs from 'fs';
import getData from './parse.js';
import buildAst from './buildAst.js';
import render from './formatters/index.js';

const readFile = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath));

export default (path1, path2, format = 'stylish') => {
  const firstFile = readFile(path1);
  const secondFile = readFile(path2);
  const firstParsed = getData(firstFile, path.extname(path1));
  const secondParsed = getData(secondFile, path.extname(path2));
  const ast = buildAst(firstParsed, secondParsed);
  return render(format, ast);
};
