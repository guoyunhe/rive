import { existsSync } from 'fs';
import { join } from 'path';
import { build } from 'vite';
import { docViteConfig } from '../config.js';

export async function buildDoc() {
  if (existsSync(join('docs', 'index.html'))) {
    await build(docViteConfig);
  }
}
