import fse from 'fs-extra';
import { merge } from 'lodash-es';
import { join } from 'path';

const settingsConfig = {
  'eslint.validate': [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact',
  ],
  'stylelint.validate': ['css', 'scss', 'less'],
  'editor.codeActionsOnSave': {
    'source.fixAll.eslint': true,
    'source.fixAll.stylelint': true,
    'source.organizeImports': true,
  },
  'editor.defaultFormatter': 'esbenp.prettier-vscode',
  'editor.formatOnSave': true,
  '[javascript]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[javascriptreact]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[typescript]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[typescriptreact]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[vue]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[css]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[less]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[scss]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[html]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[json]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
  '[jsonc]': {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
  },
};

const settingsFilePath = join(process.cwd(), '.vscode', 'settings.json');

export async function initVSCodeSettings() {
  let settingsJson;
  try {
    settingsJson = await fse.readJson(settingsFilePath);
    merge(settingsJson, settingsConfig);
  } catch (e) {
    settingsJson = settingsConfig;
  }
  await fse.outputJson(settingsFilePath, settingsJson, { spaces: 2 });
}
