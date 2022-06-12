import { build as viteBuild } from 'vite';
import { libViteConfig } from '../config.js';
import { buildDoc } from './buildDoc.js';
import { buildDTS } from './buildDTS.js';

export async function build() {
  await viteBuild(libViteConfig);
  await buildDoc();
  buildDTS();
}
