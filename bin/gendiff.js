#!/usr/bin/env node

import fs from 'fs';
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

const program = new Command();

program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((path1, path2) => console.log(genDiff(path1, path2, program.opts().format)));

program.parse(process.argv);
