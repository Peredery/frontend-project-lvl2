#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('1.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((path1, path2) => console.log(genDiff(path1, path2, program.opts().format)));

program.parse(process.argv);
