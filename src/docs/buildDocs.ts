import { existsSync } from 'fs';
import { join } from 'path';
import { build } from 'vite';
import { docSrcDir } from '../config.js';
import { docConfig } from './docConfig.js';

export async function buildDocs() {
  if (existsSync(join(docSrcDir, 'index.html'))) {
    await build(docConfig);
  }
}
