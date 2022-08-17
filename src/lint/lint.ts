import git from 'simple-git';
import { doESLint } from './doESLint.js';
import { doPrettier } from './doPrettier.js';

export interface LintOptions {
  fix?: boolean;
  staged?: boolean;
}

export async function lint({ fix, staged }: LintOptions) {
  const stagedFiles = staged ? (await git().status()).files : undefined;
  const stagedFilesToLint = stagedFiles
    ?.filter(
      (file) =>
        ['A', 'M', 'R'].includes(file.index) &&
        ['.css', '.js', '.jsx', '.less', '.scss', '.ts', '.tsx'].some((ext) =>
          file.path.endsWith(ext),
        ),
    )
    .map((file) => file.path);

  if (fix) {
    doPrettier(stagedFilesToLint);
  }

  const eslintOk = await doESLint(
    fix,
    stagedFilesToLint?.filter((file) =>
      ['.js', '.jsx', '.ts', '.tsx'].some((ext) => file.endsWith(ext)),
    ),
  );

  if (fix && stagedFilesToLint) {
    git().add(stagedFilesToLint);
  }

  if (!eslintOk) {
    process.exitCode = 1;
  }
}
