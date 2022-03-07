import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export function readTsconfig(): any {
  const fullpath = join(process.cwd(), 'tsconfig.json');
  if (existsSync(fullpath)) {
    const file = readFileSync(fullpath, 'utf8');
    try {
      return JSON.parse(file);
    } catch (e) {
      return {};
    }
  }
  return {};
}
