import { build as viteBuild } from 'vite';
import { buildDocs } from '../docs/buildDocs.js';
import { buildDTS } from './buildDTS.js';
import { libConfig } from './libConfig.js';

export interface BuildOptions {
  doc: boolean;
}

export async function build({ doc }: BuildOptions) {
  await viteBuild(libConfig);
  buildDTS();
  if (doc) {
    await buildDocs();
  }
}
