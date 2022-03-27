import fse from 'fs-extra';
import { join } from 'path';
import gitignore from '../config/gitignore.js';

const path = join(process.cwd(), '.gitignore');

export function initGitIgnore() {
  return fse.writeFile(path, gitignore);
}
