import { build as esbuild } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import i18n from 'i18n';
import { findEntry } from '../utils/findEntry.js';
import { generateDeclaration } from '../utils/generateDeclaration.js';

export function build() {
  const entry = findEntry();
  if (!entry) {
    console.error(i18n.__('error-no-entry'));
    return process.exit(1);
  }
  esbuild({
    entryPoints: [entry],
    outdir: 'dist',
    outbase: 'src',
    outExtension: {
      '.js': '.cjs.js',
    },
    bundle: true,
    format: 'cjs',
    plugins: [nodeExternalsPlugin()],
  });
  esbuild({
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
  generateDeclaration();
}
