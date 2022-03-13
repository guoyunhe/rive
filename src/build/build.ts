import { remove } from 'fs-extra';
import i18n from 'i18n';
import ora from 'ora';
import { findEntry } from '../utils/findEntry.js';
import { buildCJS } from './buildCJS.js';
import { buildDTS } from './buildDTS.js';
import { buildESM } from './buildESM.js';

export async function build() {
  const entry = findEntry();
  if (!entry) {
    console.error(i18n.__('build_err_no_entry'));
    return process.exit(1);
  }

  const start = Date.now();
  const spinner = ora(i18n.__('build_status_building')).start();

  await remove('dist');

  await Promise.all([buildESM({ entry }), buildCJS({ entry }), buildDTS()]);

  const end = Date.now();
  spinner.stop();
  console.log(i18n.__('build_status_finish'), (end - start) / 1000);
}
