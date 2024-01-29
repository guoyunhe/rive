import { createVitest } from 'vitest/node';

export interface BenchmarkOptions {
  watch?: boolean;
  ui?: boolean;
}

export async function benchmark({
  watch = false,
  ui = false,
}: BenchmarkOptions) {
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
