import { ESLint } from 'eslint';
import { Config } from '../types/Config';

export async function doESLint(config: Config, fix?: boolean, stagedFiles?: string[]) {
  // 加载配置
  const eslint = new ESLint({
    fix,
    baseConfig: config.packageJson.eslintConfig,
  });

  // 检查文件
  const results = await eslint.lintFiles(stagedFiles || 'src/**/*.{js,jsx,ts,tsx}');

  // 修复代码并保存
  if (fix) {
    await ESLint.outputFixes(results);
  }

  // 格式化结果
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = await formatter.format(results);

  // 输出结果
  // eslint-disable-next-line no-console
  console.log(resultText);

  return !ESLint.getErrorResults(results).length;
}
