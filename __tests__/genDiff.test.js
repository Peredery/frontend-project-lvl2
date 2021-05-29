import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (basename, ext) => path.join(__dirname, '..', '__fixtures__', `${basename}.${ext}`);
const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const data = [
  ['json', 'stylish', 'before', 'after', 'result'],
  ['yml', 'stylish', 'before', 'after', 'result'],
  ['json', 'plain', 'before', 'after', 'result'],
  ['yml', 'plain', 'before', 'after', 'result'],
  ['json', 'json', 'before', 'after', 'result'],
  ['yml', 'json', 'before', 'after', 'result'],
];

test.each(data)('test genDiff for %s with option %s | file1 - %s | file2 - %s', (ext, format, before, after, result) => {
  const beforeFilePath = getFixturePath(before, ext);
  const afterFilePath = getFixturePath(after, ext);
  const resultFile = readFile(getFixturePath(`${format}_${result}`, 'txt'));
  expect(genDiff(beforeFilePath, afterFilePath, format)).toBe(resultFile);
});
