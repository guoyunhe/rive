import fse from 'fs-extra';
import { merge, unset } from 'lodash-es';

const { readJsonSync, writeJsonSync } = fse;

const filePath = './package.json';

const packageJsonConfig = {
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
    extends: ['stylelint-config-rive'],
    ignoreFiles: ['node_modules', 'coverage', 'dist'],
  },
};

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
