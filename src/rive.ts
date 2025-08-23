#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import i18n from 'i18n';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { build, start } from './index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

i18n.configure({
  locales: ['en', 'zh'],
  directory: join(__dirname, 'locales'),
});

i18n.setLocale(process.env['LANG']?.substring(0, 2) || 'en');

const program = new Command('rive');

program.command('start').description(i18n.__('start_cmd_desc')).action(start);

program
  .command('build')
  .option('--no-lib', i18n.__('build_cmd_no_lib_opt_desc'))
  .option('--no-doc', i18n.__('build_cmd_no_doc_opt_desc'))
  .description(i18n.__('build_cmd_desc'))
  .action(build);

program.helpOption('-h, --help', i18n.__('help_cmd_desc'));
program.helpCommand('help [command]', i18n.__('help_cmd_desc'));

program.version(packageJson.version, '-v, --version', i18n.__('version_cmd_desc'));

program.parse();
