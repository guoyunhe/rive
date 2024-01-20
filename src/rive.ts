#!/usr/bin/env node

import { Command } from 'commander';
import i18n from 'i18n';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { version } from '../package.json';
import { build } from './build/build.js';
import { start } from './index.js';
import { lint } from './lint/lint.js';
import { test } from './test/test.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

i18n.configure({
  locales: ['en', 'zh'],
  directory: join(__dirname, 'locales'),
});

if (process.env['LANG']?.startsWith('zh')) {
  i18n.setLocale('zh');
}

const program = new Command('rive');

program.command('start').description(i18n.__('start_cmd_desc')).action(start);

program
  .command('build')
  .option('--no-doc', i18n.__('build_cmd_no_doc_opt_desc'))
  .description(i18n.__('build_cmd_desc'))
  .action(build);

program
  .command('lint')
  .description(i18n.__('lint_cmd_desc'))
  .option('--fix', i18n.__('lint_cmd_fix_opt_desc'))
  .option('--staged', i18n.__('lint_cmd_staged_opt_desc'))
  .action(lint);

program
  .command('test')
  .option('--watch')
  .option('--ui')
  .description(i18n.__('test_cmd_desc'))
  .action(test);

program.helpOption('-h, --help', i18n.__('help_cmd_desc'));
program.addHelpCommand('help [command]', i18n.__('help_cmd_desc'));

program.version(version, '-v, --version', i18n.__('version_cmd_desc'));

program.parse();
