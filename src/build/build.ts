import chalk from 'chalk';
import { parseConfig } from '../config/parseConfig.js';
import { buildDocs } from './buildDoc.js';
import { buildLib } from './buildLib.js';

export interface BuildOptions {
  lib: boolean;
  doc: boolean;
}

export async function build({ lib, doc }: BuildOptions) {
  const config = await parseConfig();
  if (lib) {
    await buildLib(config);
  }
  if (doc && !config.doc.disabled) {
    await buildDocs(config);
  } else {
    if (!doc) {
      console.log(
        chalk.dim('[rive]'),
        'Document building was skipped because you specified --no-doc option.',
      );
    }
    if (config.doc.disabled) {
      console.log(
        chalk.dim('[rive]'),
        'Document building was skipped because you set rive.doc.disabled option in package.json.',
      );
    }
  }
}
