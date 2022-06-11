import { findEntry } from '../utils/findEntry.js';
import { initEditorConfig } from './initEditorConfig.js';
import { initGitHubCI } from './initGitHubCI.js';
import { initGitIgnore } from './initGitIgnore.js';
import { initGitLabCI } from './initGitLabCI.js';
import { initTSConfig } from './initTSConfig.js';
import { initVSCodeExtensions } from './initVSCodeExtensions.js';
import { initVSCodeSettings } from './initVSCodeSettings.js';
import { removeConflictFiles } from './removeConflictFiles.js';
import { updatePackageJson } from './updatePackageJson.js';

export function init() {
  removeConflictFiles();

  // src/index.tsx
  findEntry(); // this will create src/index.tsx if not exists
  initEditorConfig();
  initGitIgnore();
  updatePackageJson();
  initTSConfig();
  initVSCodeExtensions();
  initVSCodeSettings();

  initGitLabCI();
  initGitHubCI();
}
