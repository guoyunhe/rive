import { existsSync } from 'fs';
import { join } from 'path';
import { createServer } from 'vite';
import { docSrcDir } from '../config.js';
import { docConfig } from './docConfig.js';

export async function buildDocs() {
  if (existsSync(join(docSrcDir, 'index.html'))) {
    const server = await createServer(docConfig);
    await server.listen();
    server.printUrls();
  }
}
