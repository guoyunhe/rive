import fse from 'fs-extra';
import { merge } from 'lodash-es';
import { join } from 'path';
import extensionsConfig from '../config/vscode-extensions.js';

const extensionsFilePath = join(process.cwd(), '.vscode', 'extensions.json');

export async function initVSCodeExtensions() {
  let extensionsJson;
  try {
    extensionsJson = await fse.readJson(extensionsFilePath);
    merge(extensionsJson, extensionsConfig);
  } catch (e) {
    extensionsJson = extensionsConfig;
  }
  await fse.outputJson(extensionsFilePath, extensionsJson, { spaces: 2 });
}
