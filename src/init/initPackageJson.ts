import fse from 'fs-extra';
import { merge, unset } from 'lodash-es';
import packageJsonConfig from '../config/package-json.js';

const { readJsonSync, writeJsonSync } = fse;

const filePath = './package.json';

const devDepsToRemove = [
  'vite',
  '@vitejs/plugin-react',
  'rollup',
  'esbuild',
  'webpack',
  'webpack-dev-server',
  'eslint',
  'postcss',
  'postcss-less',
  'postcss-scss',
  'stylelint',
  'stylelint-config-prettier',
  'stylelint-prettier',
  'stylelint-config-recommended-less',
  'stylelint-config-standard',
  'stylelint-scss',
  'stylelint-config-standard-scss',
  'stylelint-config-recommended-scss',
  'prettier',
  'tslint',
];

export function initPackageJson() {
  const packageJson = readJsonSync(filePath, { throws: false }) || {};

  merge(packageJson, packageJsonConfig);

  // Remove conflict devDependencies
  devDepsToRemove.forEach((dep) => {
    unset(packageJson, 'devDependencies.' + dep);
  });

  writeJsonSync(filePath, packageJson, { spaces: 2 });
}
