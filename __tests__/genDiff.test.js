import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

let file1;
let file2;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  file1 = getFixturePath('file1.json');
  file2 = getFixturePath('file2.json');
});

test('plain json', () => {
  const expected = `{
   - follow : false
   host : hexlet.io
   - proxy : 123.234.53.22
   - timeout : 50
   + timeout : 20
   - verbose : false
   + verbose : true
}`;
  expect(genDiff(file1, file2)).toMatch(expected);
});
