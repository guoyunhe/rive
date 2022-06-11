import fs from 'fs-extra';
import { tsconfigJsonPath } from '../config/common.js';

export function readTsconfigJson() {
  return fs.readJsonSync(tsconfigJsonPath, { throws: false }) || {};
}
