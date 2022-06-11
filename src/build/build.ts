import { emptyDirSync } from 'fs-extra';
import i18n from 'i18n';
import { findEntry } from '../utils/findEntry.js';
import { stepOutput } from '../utils/stepOutput.js';
import { buildCJS } from './buildCJS.js';
import { buildDTS } from './buildDTS.js';
import { buildESM } from './buildESM.js';

export async function build() {
  const entry = findEntry();

  emptyDirSync('dist');

  await stepOutput(i18n.__('build_step_esm'), () => buildESM({ entry }));

  await stepOutput(i18n.__('build_step_cjs'), () => buildCJS({ entry }));

  await stepOutput(i18n.__('build_step_dts'), () => buildDTS());
}
