import glob from 'fast-glob';
import fse from 'fs-extra';
import prettier from 'prettier';

export async function doPrettier(stagedFiles?: string[]) {
  const files =
    stagedFiles ||
    (await glob('**/*.{js,jsx,json,md,ts,tsx,yml,yaml}', {
      ignore: ['node_modules/**/*', 'build/**/*', 'dist/**/*', '.*/**/*'],
    }));
  await Promise.all(files.map(formatFile));
}

async function formatFile(filepath: string) {
  const text = await fse.readFile(filepath, 'utf8');
  const options = await prettier.resolveConfig(filepath, {
    editorconfig: true,
  });
  const formatted = await prettier.format(text, {
    ...options,
    filepath,
  });
  if (formatted !== text) {
    await fse.writeFile(filepath, formatted, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`format ${filepath} 完成`);
  }
}
