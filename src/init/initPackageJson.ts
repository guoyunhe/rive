import fse from 'fs-extra';
import { merge, unset } from 'lodash-es';

const { readJsonSync, writeJsonSync } = fse;

const filePath = './package.json';

const packageJsonConfig = {
  main: 'dist/index.cjs',
  module: 'dist/index.mjs',
  style: 'dist/index.css',
  types: 'dist/index.d.ts',
  files: ['dist', 'README.md', 'CHANGELOG.md'],
  scripts: {
    start: 'rive start',
    build: 'rive build',
    test: 'rive test',
    lint: 'rive lint',
    format: 'rive format',
  },
  devDependencies: {
    '@types/react': '^18.0.0',
    '@types/react-dom': '^18.0.0',
    '@types/jest': '^18.0.0',
    rive: 'latest',
    react: '^18.0.0',
    'react-dom': '^18.0.0',
    typescript: '^4.0.0',
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
