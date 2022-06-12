import { build as viteBuild } from 'vite';
import getLibViteConfig from '../config/lib-vite-config.js';
import { findEntry } from '../utils/findEntry.js';
import { readPackageJson } from '../utils/readPackageJson.js';
import { buildDTS } from './buildDTS.js';

export async function build() {
  const entry = findEntry();
  const packageJson = readPackageJson();

  const libViteConfig = getLibViteConfig(entry, packageJson);
  await viteBuild(libViteConfig);
  buildDTS();
}
