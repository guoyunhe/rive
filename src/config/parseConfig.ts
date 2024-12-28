import chalk from 'chalk';
import { readFile } from 'fs/promises';
import JSON5 from 'json5';
import { join } from 'path';
import { Config } from '../types/Config.js';
import { TemplateType } from '../types/TemplateType.js';

export async function parseConfig() {
  let packageJson: any = {};
  try {
    packageJson = JSON.parse(await readFile(join(process.cwd(), 'package.json'), 'utf-8'));
  } catch (e) {
    console.log(
      chalk.cyan('[rive]'),
      'Cannot read package.json. Please run "npm create rive" to initialize.',
    );
    throw e;
  }

  // tsconfig.json support comments, so we have to use JSON5 parser
  let tsconfigJson: any = {};
  try {
    tsconfigJson = JSON5.parse(await readFile(join(process.cwd(), 'tsconfig.json'), 'utf-8'));
  } catch (e) {
    console.log(
      chalk.cyan('[rive]'),
      'Cannot read tsconfig.json. Please run "npm create rive" to initialize.',
    );
    throw e;
  }

  const template = packageJson.rive?.template || TemplateType.React;
  const doc = packageJson.rive?.doc || {};
  doc.basename = doc.basename ? join('/', packageJson.rive?.doc?.basename || '.') : '/';
  const lib = packageJson.rive?.lib || {};

  if (!doc.title) {
    doc.title = packageJson.name + ' - ' + packageJson.description;
  }

  const config: Config = {
    template,
    doc,
    lib,
    packageJson,
    tsconfigJson,
  };

  return config;
}
