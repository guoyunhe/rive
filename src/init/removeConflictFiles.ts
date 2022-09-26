import FastGlob from 'fast-glob';
import { rmSync } from 'node:fs';

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
