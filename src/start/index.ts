import { createServer } from 'vite';
import getDocConfig from '../build/getDocConfig.js';

export async function start() {
  const server = await createServer(getDocConfig());
  await server.listen();
  server.printUrls();
}
