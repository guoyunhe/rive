import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import { join } from 'path';
import recmaExportFilepath from 'recma-export-filepath';
import recmaMdxDisplayname from 'recma-mdx-displayname';
import rehypeMdxCodeImports from 'rehype-mdx-code-imports';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import rehypeMdxTitle from 'rehype-mdx-title';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { Config } from '../types/Config.js';
import { docVitePlugin } from './docVitePlugin.js';

export default async function getDocConfig(config: Config, type: 'server' | 'build') {
  const docOutDir = join(process.cwd(), 'build');

  return defineConfig({
    base: config.doc.basename,
    define: {
      PACKAGE_NAME: `"${config.packageJson.name}"`,
      PACKAGE_VERSION: `"${config.packageJson.version}"`,
      'process.env': process.env, // https://github.com/vitejs/vite/issues/1973
    },
    // Vite cannot watch parent directory. So in server mode we have to set root
    // to project root instead of `.rive`. To avoid expose `index.html`, we use
    // `doc()` plugin to server html, to get rid of `index.html` on project root.
    // However, in build mode, we still use `.rive` as Vite root because here is
    // no way to skip `index.html` on disk.
    root: type === 'server' ? process.cwd() : join(process.cwd(), '.rive'),
    publicDir: join(process.cwd(), '.rive', 'public'),
    build: {
      emptyOutDir: true,
      outDir: docOutDir,
      chunkSizeWarningLimit: 9999,
    },
    plugins: [
      {
        enforce: 'pre',
        ...mdx({
          providerImportSource: '@mdx-js/react',
          recmaPlugins: [[recmaExportFilepath, { cwd: config.doc.root }], recmaMdxDisplayname],
          rehypePlugins: [
            rehypeMdxTitle,
            rehypeMdxCodeImports,
            rehypeMdxCodeProps,
            rehypeMdxImportMedia,
          ],
          remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        }),
      },
      react({ tsDecorators: true }),
      tsconfigPaths(),
      docVitePlugin(config),
    ],
    resolve: {
      alias: {
        [config.packageJson.name]: join(process.cwd(), 'src'),
      },
    },
    server: {
      host: true,
      open: config.doc.basename,
    },
  });
}
