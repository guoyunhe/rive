import { join } from 'path';
import getPackageJson from './getPackageJson.js';

export async function getBasename() {
  const packageJson = await getPackageJson();
  const basename = join('/', packageJson.rive?.doc?.basename || '.');
  return basename;
}
