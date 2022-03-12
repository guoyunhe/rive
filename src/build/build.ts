import i18n from 'i18n';
import ora from 'ora';
import { findEntry } from '../utils/findEntry.js';
import { buildCJS } from './buildCJS.js';
import { buildDTS } from './buildDTS.js';
import { buildESM } from './buildESM.js';

export async function build() {
  const start = Date.now();
  const entry = findEntry();
  if (!entry) {
    console.error(i18n.__('build_err_no_entry'));
    return process.exit(1);
  }
  const spinner = ora('building').start();
  await Promise.all([buildESM({ entry }), buildCJS({ entry }), buildDTS()]);
  spinner.stop();
  const end = Date.now();
  console.log('build done in %ds', (end - start) / 1000);
}
