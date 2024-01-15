import glob from 'fast-glob';
import fse from 'fs-extra';
import prettier from 'prettier';

export async function doPrettier(stagedFiles?: string[]) {
  const files =
    stagedFiles || (await glob(['package.json', 'src/**/*.{js,jsx,ts,tsx}']));
  await Promise.all(files.map(formatFile));
}

async function formatFile(filePath: string) {
  const text = await fse.readFile(filePath, 'utf8');
  const options = await prettier.resolveConfig(filePath, {
    editorconfig: true,
  });
  const formatted = await prettier.format(text, {
    ...options,
    filepath: filePath,
  });
  if (formatted !== text) {
    await fse.writeFile(filePath, formatted, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`格式化文件 ${filePath} 完成`);
  }
}
