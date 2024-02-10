import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react-swc';
import { join } from 'path';
import recmaExportFilepath from 'recma-export-filepath';
import recmaMdxDisplayname from 'recma-mdx-displayname';
import rehypeMdxCodeImports from 'rehype-mdx-code-imports';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import rehypeMdxTitle from 'rehype-mdx-title';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkMdxImages from 'remark-mdx-images';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { Config } from '../types/Config.js';

export default async function getDocConfig(config: Config) {
  const docSrcDir = join(process.cwd(), '.rive');
  const docOutDir = join(process.cwd(), 'build');

  return defineConfig({
    base: config.doc.basename,
    define: {
      PACKAGE_NAME: `"${config.packageJson.name}"`,
      PACKAGE_VERSION: `"${config.packageJson.version}"`,
      'process.env': process.env, // https://github.com/vitejs/vite/issues/1973
    },
    root: docSrcDir,
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
          recmaPlugins: [
            [recmaExportFilepath, { cwd: config.doc.rootDir }],
            recmaMdxDisplayname,
          ],
          rehypePlugins: [
            rehypeMdxTitle,
            rehypeMdxCodeImports,
            rehypeMdxCodeProps,
          ],
          remarkPlugins: [
            remarkGfm,
            remarkFrontmatter,
            remarkMdxFrontmatter,
            remarkMdxImages,
          ],
        }),
      },
      react({ tsDecorators: true }),
      tsconfigPaths(),
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
