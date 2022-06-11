import fs from 'fs-extra';
import { packageJsonPath } from '../config/common.js';

export function readPackageJson() {
  return fs.readJsonSync(packageJsonPath, { throws: false }) || {};
}
