import fse from 'fs-extra';
import { merge } from 'lodash-es';
import { join } from 'path';
import settingsConfig from '../config/vscode-settings.js';

const settingsFilePath = join(process.cwd(), '.vscode', 'settings.json');

export async function initVSCodeSettings() {
  let settingsJson;
  try {
    settingsJson = await fse.readJson(settingsFilePath);
    merge(settingsJson, settingsConfig);
  } catch (e) {
    settingsJson = settingsConfig;
  }
  await fse.outputJson(settingsFilePath, settingsJson, { spaces: 2 });
}
