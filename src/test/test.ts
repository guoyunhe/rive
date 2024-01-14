import { createVitest } from 'vitest/node';

export interface TestOptions {
  watch?: boolean;
  ui?: boolean;
}

export async function test({ watch = false, ui = false }: TestOptions) {
  const vitest = await createVitest('test', {
    watch,
    ui,
    passWithNoTests: true,
    globals: true,
    environment: 'happy-dom',
  });

  await vitest.start();
}
