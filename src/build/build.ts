import { build as viteBuild } from 'vite';
import { libViteConfig } from '../config.js';
import { buildDocs } from '../docs/buildDocs.js';
import { buildDTS } from './buildDTS.js';

export interface BuildOptions {
  doc: boolean;
}

export async function build({ doc }: BuildOptions) {
  await viteBuild(libViteConfig);
  buildDTS();
  if (doc) {
    await buildDocs();
  }
}
