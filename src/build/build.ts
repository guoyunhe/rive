import i18n from 'i18n';
import { build as viteBuild } from 'vite';
import getLibViteConfig from '../config/lib-vite-config.js';
import { findEntry } from '../utils/findEntry.js';
import { readPackageJson } from '../utils/readPackageJson.js';
import { stepOutput } from '../utils/stepOutput.js';
import { buildDTS } from './buildDTS.js';

export async function build() {
  const entry = findEntry();
  const packageJson = readPackageJson();

  const libViteConfig = getLibViteConfig(entry, packageJson);
  await viteBuild(libViteConfig);
  await stepOutput(i18n.__('build_step_dts'), () => buildDTS());
}
