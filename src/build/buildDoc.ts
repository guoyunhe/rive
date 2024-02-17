import { build } from 'vite';
import { Config } from '../types/Config';
import getDocConfig from './getDocConfig.js';
import { setupDoc } from './setupDoc.js';

export async function buildDocs(config: Config) {
  await setupDoc(config);
  await build(await getDocConfig(config, 'build'));
}
