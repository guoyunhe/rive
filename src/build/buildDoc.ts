import { build } from 'vite';
import getDocConfig from '../config/getDocConfig.js';
import { setupDoc } from './setupDoc.js';

export async function buildDocs() {
  await setupDoc();
  await build(await getDocConfig());
}
