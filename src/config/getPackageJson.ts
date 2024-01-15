import fs from 'fs-extra';
import { join } from 'path';

let cached: any = null;

export default async function getPackageJson(refresh?: boolean) {
  if (!cached || refresh) {
    cached =
      (await fs.readJson(join(process.cwd(), 'package.json'), {
        throws: false,
      })) || {};
  }
  return cached;
}
