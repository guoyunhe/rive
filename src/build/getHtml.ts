import { Config } from '../types/Config.js';

/**
 * Generate index.html
 *
 * In server mode, the index.html is serveed directly by node HTTP server.
 * In build mode, the index.html is saved on disk, at `.rive/index.html`.
 */
export function getHtml(config: Config, type: 'server' | 'build') {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${config.doc.title}</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script checks to see if a redirect is present in the query string,
      // converts it back into the correct url and adds it to the
      // browser's history using window.history.replaceState(...),
      // which won't cause the browser to attempt to load the new url.
      // When the single page app is loaded further down in this file,
      // the correct url will be waiting in the browser's history for
      // the single page app to route accordingly.
      (function(l) {
        if (l.search[1] === '/' ) {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${type === 'server' ? '/.rive/index.jsx' : '/index.jsx'}"></script>
  </body>
</html>`;
}
