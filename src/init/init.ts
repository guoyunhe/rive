import { removeConflictFiles } from './removeConflictFiles.js';
import { updateEditorConfig } from './updateEditorConfig.js';
import { updateGitIgnore } from './updateGitIgnore.js';
import { updatePackageJson } from './updatePackageJson.js';
import { updateTsconfigJson } from './updateTsconfigJson.js';

export function init() {
  removeConflictFiles();
  updateEditorConfig();
  updateGitIgnore();
  updatePackageJson();
  updateTsconfigJson();
}
