import { build } from 'vite';
import getDocConfig from '../config/getDocConfig.js';
import { Config } from '../types/Config';
import { setupDoc } from './setupDoc.js';

export async function buildDocs(config: Config) {
  await setupDoc(config);
  await build(await getDocConfig(config));
}
