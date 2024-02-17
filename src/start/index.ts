import { createServer } from 'vite';
import getDocConfig from '../build/getDocConfig.js';
import { setupDoc } from '../build/setupDoc.js';
import { parseConfig } from '../config/parseConfig.js';

export async function start() {
  const config = await parseConfig();
  await setupDoc(config, true);
  const server = await createServer(await getDocConfig(config, 'server'));
  await server.listen();
  server.printUrls();
}
