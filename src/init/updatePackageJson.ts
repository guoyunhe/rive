import fse from 'fs-extra';
import { merge, unset } from 'lodash-es';

const { readJsonSync, writeJsonSync } = fse;

const filePath = './package.json';

const config = {
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
  eslintConfig: {},
  eslintIgnore: ['node_modules', 'coverage', 'dist'],
  stylelint: {
    ignoreFiles: ['node_modules', 'coverage', 'dist'],
  },
};

export function updatePackageJson() {
  const packageJson = readJsonSync(filePath, { throws: false }) || {};

  merge(packageJson, config);

  // Remove devDependencies
  const depsToRemove = ['eslint', 'stylelint', 'prettier'];
  depsToRemove.forEach((dep) => {
    unset(packageJson, 'devDependencies.' + dep);
  });

  writeJsonSync(filePath, packageJson, { spaces: 2 });
}
