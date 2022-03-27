import fse from 'fs-extra';
import { merge, unset } from 'lodash-es';
import packageJsonConfig from '../config/package-json.js';

const { readJsonSync, writeJsonSync } = fse;

const filePath = './package.json';

const depsToRemove = ['eslint', 'stylelint', 'prettier', 'tslint'];

export function updatePackageJson() {
  const packageJson = readJsonSync(filePath, { throws: false }) || {};

  merge(packageJson, packageJsonConfig);

  // Remove devDependencies
  depsToRemove.forEach((dep) => {
    unset(packageJson, 'devDependencies.' + dep);
  });

  writeJsonSync(filePath, packageJson, { spaces: 2 });
}
