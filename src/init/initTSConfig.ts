import fse from 'fs-extra';
import { merge } from 'lodash-es';
import tsconfig from '../config/tsconfig.js';

const filePath = './tsconfig.json';

export async function initTSConfig() {
  let tsconfigJson;
  try {
    tsconfigJson = await fse.readJson(filePath);
    merge(tsconfigJson, tsconfig);
  } catch (e) {
    tsconfigJson = tsconfig;
  }
  await fse.outputJson(filePath, tsconfigJson, { spaces: 2 });
}
