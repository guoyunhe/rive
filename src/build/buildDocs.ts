import { existsSync } from 'fs';
import { join } from 'path';
import { build } from 'vite';
import { docSrcDir } from '../config/index.js';
import getDocConfig from './getDocConfig.js';

export async function buildDocs() {
  if (existsSync(join(docSrcDir, 'index.html'))) {
    await build(getDocConfig());
  }
}
