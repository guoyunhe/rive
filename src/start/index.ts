import { createServer } from 'vite';
import { setupDoc } from '../build/setupDoc.js';
import getDocConfig from '../config/getDocConfig.js';
import { parseConfig } from '../config/parseConfig.js';

export async function start() {
  const config = await parseConfig();
  await setupDoc(config, true);
  const server = await createServer(await getDocConfig(config));
  await server.listen();
  server.printUrls();
}
