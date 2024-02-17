import { Plugin } from 'vite';
import { Config } from '../types/Config.js';
import { getHtml } from './getHtml.js';

export function doc(config: Config): Plugin {
  return {
    name: 'rive:doc',
    configureServer: (server) => {
      return () => {
        // serve our index.html after vite history fallback
        server.middlewares.use(async (req, res, next) => {
          if (!req.url) return next();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          let html = getHtml(config, 'server');
          html = await server.transformIndexHtml(
            req.url,
            html,
            req.originalUrl,
          );
          res.end(html);
        });
      };
    },
  };
}
