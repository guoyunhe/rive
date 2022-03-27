import { createFoldersFiles } from './createFoldersFiles.js';
import { initGitIgnore } from './initGitIgnore.js';
import { initVSCodeExtensions } from './initVSCodeExtensions.js';
import { initVSCodeSettings } from './initVSCodeSettings.js';
import { removeConflictFiles } from './removeConflictFiles.js';
import { updateEditorConfig } from './updateEditorConfig.js';
import { updatePackageJson } from './updatePackageJson.js';
import { updateTsconfigJson } from './updateTsconfigJson.js';

export function init() {
  removeConflictFiles();
  createFoldersFiles();
  updateEditorConfig();
  initGitIgnore();
  updatePackageJson();
  updateTsconfigJson();
  initVSCodeExtensions();
  initVSCodeSettings();
}
