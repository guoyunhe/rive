import { createServer } from 'vite';
import { setupDoc } from '../build/setupDoc.js';
import getDocConfig from '../config/getDocConfig.js';

export async function start() {
  await setupDoc(true);
  const server = await createServer(await getDocConfig());
  await server.listen();
  server.printUrls();
}
