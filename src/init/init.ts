import { createFoldersFiles } from './createFoldersFiles.js';
import { initGitIgnore } from './initGitIgnore.js';
import { initTSConfig } from './initTSConfig.js';
import { initVSCodeExtensions } from './initVSCodeExtensions.js';
import { initVSCodeSettings } from './initVSCodeSettings.js';
import { removeConflictFiles } from './removeConflictFiles.js';
import { updateEditorConfig } from './updateEditorConfig.js';
import { updatePackageJson } from './updatePackageJson.js';

export function init() {
  removeConflictFiles();
  createFoldersFiles();
  updateEditorConfig();
  initGitIgnore();
  updatePackageJson();
  initTSConfig();
  initVSCodeExtensions();
  initVSCodeSettings();
}
