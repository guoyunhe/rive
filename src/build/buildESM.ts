import { build as esbuild } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

export interface BuildESMOptions {
  entry: string;
}

/**
 * Build ESM bundle and CSS bundle
 */
export async function buildESM({ entry }: BuildESMOptions) {
  return esbuild({
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
