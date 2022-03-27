import { createFoldersFiles } from './createFoldersFiles.js';
import { initVSCodeExtensions } from './initVSCodeExtensions.js';
import { initVSCodeSettings } from './initVSCodeSettings.js';
import { removeConflictFiles } from './removeConflictFiles.js';
import { updateEditorConfig } from './updateEditorConfig.js';
import { updateGitIgnore } from './updateGitIgnore.js';
import { updatePackageJson } from './updatePackageJson.js';
import { updateTsconfigJson } from './updateTsconfigJson.js';

export function init() {
  removeConflictFiles();
  createFoldersFiles();
  updateEditorConfig();
  updateGitIgnore();
  updatePackageJson();
  updateTsconfigJson();
  initVSCodeExtensions();
  initVSCodeSettings();
}
