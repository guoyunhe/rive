import nodeExternals from 'rollup-plugin-node-externals';
import type { UserConfig } from 'vite';
import { entry, outDir, packageJson } from '../config.js';

export const libConfig: UserConfig = {
  build: {
    minify: false,
    emptyOutDir: true,
    outDir,
    lib: {
      entry,
      formats: ['es', 'cjs'],
      fileName: (format: string) => {
        if (format === 'es') {
          return 'index.mjs';
        } else if (format === 'cjs') {
          return 'index.cjs';
        } else {
          return 'index.' + format + '.js';
        }
      },
    },
    rollupOptions: {
      external: [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {}),
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css') return 'index.css';
          return chunkInfo.name || 'unknown';
        },
      },
    },
  },
  plugins: [nodeExternals()],
};