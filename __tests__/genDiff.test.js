import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const data = [
  ['json', 'before.json', 'after.json', 'result.txt'],
  ['yml', 'before.yml', 'after.json', 'result.txt'],
];

test.each(data)('test genDiff for %s | file1 - %s | file2 - %s', (format, before, after, result) => {
  const beforeFilePath = getFixturePath(before);
  const afterFilePath = getFixturePath(after);
  const resultFile = readFile(result);
  expect(genDiff(beforeFilePath, afterFilePath)).toBe(resultFile);
});
