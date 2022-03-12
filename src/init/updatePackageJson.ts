import { set, unset } from 'lodash-es';
import { readPackageSync } from 'read-pkg';
import { writePackageSync } from 'write-pkg';

export function updatePackageJson() {
  let packageJson = {};
  try {
    packageJson = readPackageSync();
  } catch (e) {}
  // Set scripts
  set(packageJson, 'scripts.start', 'rive start');
  set(packageJson, 'scripts.build', 'rive build');
  set(packageJson, 'scripts.test', 'rive test');
  set(packageJson, 'scripts.lint', 'rive lint');
  set(packageJson, 'scripts.format', 'rive format');

  // Add devDependencies
  set(packageJson, 'devDependencies.rive', 'latest');

  // Remove devDependencies
  const depsToRemove = ['eslint', 'stylelint', 'prettier'];
  depsToRemove.forEach((dep) => {
    unset(packageJson, 'devDependencies.' + dep);
  });

  set(packageJson, 'eslintConfig', {}); // TODO
  set(packageJson, 'eslintIgnore', ['node_modules', 'coverage', 'dist']); // TODO
  set(packageJson, 'stylelint', {}); // TODO

  writePackageSync(packageJson);
}
