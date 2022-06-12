import { initEditorConfig } from './initEditorConfig.js';
import { initGitHubCI } from './initGitHubCI.js';
import { initGitIgnore } from './initGitIgnore.js';
import { initGitLabCI } from './initGitLabCI.js';
import { initPackageJson } from './initPackageJson.js';
import { initTSConfig } from './initTSConfig.js';
import { initVSCodeExtensions } from './initVSCodeExtensions.js';
import { initVSCodeSettings } from './initVSCodeSettings.js';
import { removeConflictFiles } from './removeConflictFiles.js';

export function init() {
  removeConflictFiles();

  initEditorConfig();
  initGitIgnore();
  initPackageJson();
  initTSConfig();
  initVSCodeExtensions();
  initVSCodeSettings();

  initGitLabCI();
  initGitHubCI();
}
