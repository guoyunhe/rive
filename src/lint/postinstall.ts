import husky from 'husky';

/**
 * install husky hooks
 */
export function postinstall() {
  try {
    husky.install('node_modules/.husky');
    husky.set('node_modules/.husky/pre-commit', 'node_modules/.bin/rive lint --staged --fix');
  } catch (e) {
    // skip if .git folder not found
  }
}
