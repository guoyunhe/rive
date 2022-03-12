import fse from 'fs-extra';
import { merge } from 'lodash-es';

const { readJsonSync, writeJsonSync } = fse;

const filePath = './tsconfig.json';

const config = {
  compilerOptions: {
    strict: true,
    module: 'ESNext',
    moduleResolution: 'node',
    target: 'ES6',
    lib: ['ESNext'],
    outDir: 'lib',
    rootDir: 'src',
    allowSyntheticDefaultImports: true,
  },
  include: ['src/**/*.ts', 'src/**/*.tsx'],
  exclude: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
};

export function updateTsconfigJson() {
  const tsconfigJson = readJsonSync(filePath, { throws: false }) || {};
  merge(tsconfigJson, config);
  writeJsonSync(filePath, tsconfigJson, { spaces: 2 });
}
