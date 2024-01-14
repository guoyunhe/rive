import fse from 'fs-extra';
import { merge } from 'lodash-es';

// Based on https://www.npmjs.com/package/@tsconfig/vite-react
const tsconfig = {
  compilerOptions: {
    target: 'esnext',
    lib: ['esnext', 'dom', 'dom.iterable'],
    allowJs: false,
    skipLibCheck: false,
    esModuleInterop: false,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    module: 'esnext',
    moduleResolution: 'node',
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: 'react',
    types: ['node', 'react', 'vitest/globals'],
  },
  include: ['src/**/*.ts', 'src/**/*.tsx'],
  exclude: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
};

const filePath = './tsconfig.json';

export async function initTSConfig() {
  let tsconfigJson;
  try {
    tsconfigJson = await fse.readJson(filePath);
    merge(tsconfigJson, tsconfig);
  } catch (e) {
    tsconfigJson = tsconfig;
  }
  await fse.outputJson(filePath, tsconfigJson, { spaces: 2 });
}
