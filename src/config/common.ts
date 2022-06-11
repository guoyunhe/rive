import { join } from 'path';

export const root = process.cwd();

export const outDir = 'dist';
export const srcDir = 'src';

export const include = ['src/**/*.tsx', 'src/**/*.ts'];
export const exclude = [
  'src/**/*.spec.tsx',
  'src/**/*.spec.ts',
  'src/**/*.test.tsx',
  'src/**/*.test.ts',
];

export const packageJsonPath = join(root, 'package.json');
export const tsconfigJsonPath = join(root, 'tsconfig.json');
