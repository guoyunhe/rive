import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

export interface BuildESMOptions {
  entry: string;
}

/**
 * Build ESM bundle and CSS bundle
 */
export function buildESM({ entry }: BuildESMOptions) {
  return build({
    entryPoints: [entry],
    outdir: 'dist',
    outbase: 'src',
    outExtension: {
      '.js': '.esm.js',
    },
    bundle: true,
    format: 'esm',
    plugins: [nodeExternalsPlugin()],
  });
}
