import glob from 'fast-glob';
import fs from 'fs-extra';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export * from './getPackageJson';

export const root = process.cwd();

export const srcDir = 'src';
export const outDir = 'dist';

function findOrCreateEntry() {
  const entries = glob.sync('src/index.{tsx,ts,jsx,js}');
  let entry = entries[0];
  if (!entry) {
    const entryFileContent = `import React, { ReactNode } from 'react';

export interface MyComponentProps {
  children?: ReactNode;
}

export function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}
`;
    entry = join(srcDir, 'index.tsx');
    fs.outputFileSync(entry, entryFileContent);
  }
  return entry;
}

export const entry = findOrCreateEntry();

export const include = ['src/**/*.tsx', 'src/**/*.ts'];
export const exclude = [
  '**/*.spec.tsx',
  '**/*.spec.ts',
  '**/*.test.tsx',
  '**/*.test.ts',
];

export const packageJsonPath = join(root, 'package.json');
export const tsconfigJsonPath = join(root, 'tsconfig.json');
export const packageJson =
  fs.readJsonSync(packageJsonPath, { throws: false }) || {};

export const gitignorePath = '.gitignore';
export const gitignoreFullPath = join(root, gitignorePath);

const __dirname = dirname(fileURLToPath(import.meta.url));
export const riveRootFullPath = join(__dirname, '..');
export const rivePackageJsonFullPath = join(riveRootFullPath, 'package.json');
export const riveVersion = fs.readJsonSync(rivePackageJsonFullPath, {
  throws: false,
})?.version;

export const docSrcDir = 'docs';
export const docOutDir = 'build';
