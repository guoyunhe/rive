import { buildDocs } from '../docs/buildDocs.js';
import { buildLib } from './buildLib.js';

export interface BuildOptions {
  doc: boolean;
}

export async function build({ doc }: BuildOptions) {
  await buildLib();
  if (doc) {
    await buildDocs();
  }
}
