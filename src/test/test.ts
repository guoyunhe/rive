import glob from 'fast-glob';
import { createVitest } from 'vitest/node';

export interface TestOptions {
  watch?: boolean;
  ui?: boolean;
}

export async function test({ watch = false, ui = false }: TestOptions) {
  const setupFiles = await glob([
    'setupTests.ts',
    '{src,test,tests}/setupTests.ts',
  ]);

  const vitest = await createVitest('test', {
    watch: watch || ui,
    ui,
    passWithNoTests: true,
    globals: true,
    environment: 'happy-dom',
    setupFiles,
    include: ['{src,test,tests}/**/*.{spec,test}.(c|m)[jt]s?(x)'],
  });

  await vitest.start();
  if (!watch && !ui) {
    await vitest.close();
  }
}
