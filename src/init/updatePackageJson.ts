import fse from 'fs-extra';
import { merge, unset } from 'lodash-es';

const { readJsonSync, writeJsonSync } = fse;

const filePath = './package.json';

const config = {
  main: 'dist/index.cjs.js',
  module: 'dist/index.esm.js',
  style: 'dist/index.css',
  types: 'dist/index.d.ts',
  files: ['dist', 'README.md'],
  scripts: {
    start: 'rive start',
    build: 'rive build',
    test: 'rive test',
    lint: 'rive lint',
    format: 'rive format',
  },
  devDependencies: {
    rive: 'latest',
  },
  eslintConfig: {
    extends: ['rive'],
  },
  eslintIgnore: ['node_modules', 'coverage', 'dist'],
  stylelint: {
    ignoreFiles: ['node_modules', 'coverage', 'dist'],
  },
};

const depsToRemove = ['eslint', 'stylelint', 'prettier', 'tslint'];

export function updatePackageJson() {
  const packageJson = readJsonSync(filePath, { throws: false }) || {};

  merge(packageJson, config);

  // Remove devDependencies
  depsToRemove.forEach((dep) => {
    unset(packageJson, 'devDependencies.' + dep);
  });

  writeJsonSync(filePath, packageJson, { spaces: 2 });
}
