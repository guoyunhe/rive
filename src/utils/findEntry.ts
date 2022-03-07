import { existsSync } from 'fs';
import { join } from 'path';
import { entry } from '../config.js';

export function findEntry() {
  for (const filename of entry) {
    const fullpath = join(process.cwd(), filename);
    if (existsSync(fullpath)) {
      return fullpath;
    }
  }
}
