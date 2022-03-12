import FastGlob from 'fast-glob';
import { rmSync } from 'fs';

export function removeConflictFiles() {
  const files = FastGlob.sync([
    '.eslint*',
    '.stylelint*',
    '.prettier*',
    'tslint.*',
  ]);
  files.forEach((filePath) => {
    rmSync(filePath, { recursive: true });
  });
}
