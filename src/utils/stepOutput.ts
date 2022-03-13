import chalk from 'chalk';
import ora from 'ora';

export async function stepOutput(name: string, exec: () => Promise<any>) {
  const start = Date.now();
  const spinner = ora(name).start();
  await exec();
  spinner.stop();
  const duration = (Date.now() - start) / 1000;
  console.log(chalk.green('✓') + ' ' + name + ' ' + chalk.cyan(duration + 's'));
}
