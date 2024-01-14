import react from '@vitejs/plugin-react-swc';
import type { UserConfig } from 'vite';
import { docOutDir, docSrcDir } from '../config.js';

export const docConfig: UserConfig = {
  root: docSrcDir,
  build: {
    emptyOutDir: true,
    outDir: docOutDir,
  },
  define: {
    'process.env': process.env, // https://github.com/vitejs/vite/issues/1973
  },
  plugins: [react()],
  server: {
    host: true,
    open: true,
  },
};
