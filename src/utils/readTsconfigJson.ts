import fs from 'fs-extra';
import { tsconfigJsonPath } from '../config/index.js';

export function readTsconfigJson() {
  return fs.readJsonSync(tsconfigJsonPath, { throws: false }) || {};
}
