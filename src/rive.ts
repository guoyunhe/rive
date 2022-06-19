import { Command } from 'commander';
import { dirname } from 'dirname-filename-esm';
import i18n from 'i18n';
import { join } from 'path';
import { build } from './build/build.js';
import { riveVersion } from './config.js';
import { init } from './init/init.js';

i18n.configure({
  locales: ['en', 'zh'],
  directory: join(dirname(import.meta), '..', 'locales'),
});

if (process.env['LANG']?.startsWith('zh')) {
  i18n.setLocale('zh');
}

const program = new Command('rive');

program
  .command('build')
  .option('--no-doc', i18n.__('build_cmd_no_doc_opt_desc'))
  .description(i18n.__('build_cmd_desc'))
  .action(build);

program.command('init').description(i18n.__('init_cmd_desc')).action(init);

program.helpOption('-h, --help', i18n.__('help_cmd_desc'));
program.addHelpCommand('help [command]', i18n.__('help_cmd_desc'));

program.version(riveVersion, '-v, --version', i18n.__('version_cmd_desc'));

program.parse();
