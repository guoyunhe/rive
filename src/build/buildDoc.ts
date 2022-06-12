import { build } from 'vite';
import { docViteConfig } from '../config.js';
import { generateDocSrc } from './generateDocSrc.js';

export async function buildDoc() {
  generateDocSrc();
  await build(docViteConfig);
}
