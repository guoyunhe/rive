import { createVitest } from 'vitest/node';

export interface BenchOptions {
  watch?: boolean;
  ui?: boolean;
}

export async function bench({ watch = false, ui = false }: BenchOptions) {
  const vitest = await createVitest('benchmark', {
    watch: watch || ui,
    ui,
    passWithNoTests: true,
    globals: true,
    environment: 'happy-dom',
  });

  await vitest.start();
  if (!watch && !ui) {
    await vitest.close();
  }
}
