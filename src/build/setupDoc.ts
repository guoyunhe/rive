import chokidar from 'chokidar';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { join } from 'path';
import { Config } from '../types/Config.js';
import { outputFileMemo } from '../utils/outputFileMemo.js';

export async function setupDoc(config: Config, watch?: boolean) {
  const docUIPath =
    config.packageJson.name === 'react-doc-ui' ? '../src' : 'react-doc-ui';
  const rootDir = config.doc.root || '.';
  const include = config.doc.include || ['**/*.md', '**/*.mdx'];
  const exclude = [
    ...(config.doc.exclude || []),
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**',
  ];

  await fs.mkdirp('.rive');

  await fs.outputFile(
    join(process.cwd(), '.rive', 'index.html'),
    `
<!DOCTYPE html>
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
  <script type="module" src="./index.jsx"></script>
</body>
</html>
`,
  );

  const pathSegmentsToKeep = config.doc.basename
    .split('/')
    .filter(Boolean).length;
  await fs.outputFile(
    join(process.cwd(), '.rive', 'public', '404.html'),
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Single Page Apps for GitHub Pages</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script takes the current url and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new url with only a query string and hash fragment,
      // e.g. https://www.foo.tld/one/two?a=b&c=d#qwe, becomes
      // https://www.foo.tld/?/one/two&a=b~and~c=d#qwe
      // Note: this 404.html file must be at least 512 bytes for it to work
      // with Internet Explorer (it is currently > 512 bytes)

      // If you're creating a Project Pages site and NOT using a custom domain,
      // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
      // This way the code will only replace the route part of the path, and not
      // the real directory in which the app resides, for example:
      // https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
      // https://username.github.io/repo-name/?/one/two&a=b~and~c=d#qwe
      // Otherwise, leave pathSegmentsToKeep as 0.
      var pathSegmentsToKeep = ${pathSegmentsToKeep};

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );

    </script>
  </head>
  <body>
  </body>
</html>
`,
  );

  await fs.outputFile(
    join(process.cwd(), '.rive', 'index.jsx'),
    `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
`,
  );

  const update = async () => {
    const files = await glob(include, {
      ignore: exclude,
      cwd: rootDir,
    });
    await outputFileMemo(
      join(process.cwd(), '.rive', 'App.jsx'),
      `
import React from 'react';
import DocUI from '${docUIPath}';
${files.map((file, index) => `import * as doc${index} from '../${join(rootDir, file)}'`).join(';\n')}

export default function App() {
  return (
    <DocUI
      docs={[ ${files.map((_file, index) => `doc${index}`).join(', ')} ]}
      basename="${config.doc.basename}"
      languages={${JSON.stringify(config.doc.languages)}}
    />
  );
}
`,
    );
  };

  await update();

  if (watch) {
    const watcher = chokidar.watch(include, {
      ignored: exclude,
      cwd: rootDir,
      persistent: true,
    });

    watcher.on('change', () => update());
    watcher.on('add', () => update());
  }
}
