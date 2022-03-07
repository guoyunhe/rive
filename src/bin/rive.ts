import { Command } from 'commander';
import i18n from 'i18n';
import { join } from 'path';
import { dirname } from 'dirname-filename-esm';
import { build } from '../actions/build.js';

i18n.configure({
  locales: ['en', 'zh'],
  directory: join(dirname(import.meta), '..', '..', 'locales'),
});

if (process.env.LANG?.startsWith('zh')) {
  i18n.setLocale('zh');
}

const program = new Command('rive');

program
  .command('build')
  .description(i18n.__('build the library'))
  .action(build);

program.version(
  '0.1.0',
  '-v, --version',
  i18n.__('show version of this program')
);

program.parse();
