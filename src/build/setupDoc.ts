import chokidar from 'chokidar';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { join } from 'node:path';
import { Config } from '../types/Config.js';
import { outputFileMemo } from '../utils/outputFileMemo.js';
import { getHtml } from './getHtml.js';

export async function setupDoc(config: Config, watch?: boolean) {
  const docUIPath = 'rive/ui';
  const rootDir = config.doc.root || '.';
  const include = config.doc.include || ['**/*.md', '**/*.mdx'];
  const exclude = [
    ...(config.doc.exclude || []),
    '**/node_modules/**',
    '**/build/**',
    '**/dist/**',
  ];

  await fs.mkdirp('.rive');

  await fs.outputFile(join(process.cwd(), '.rive', 'index.html'), getHtml(config, 'build'));

  const pathSegmentsToKeep = config.doc.basename.split('/').filter(Boolean).length;
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

  const updateIndexJs = async () => {
    const setupFiles = await glob('src/setupDocs.{js,jsx,ts,tsx}');
    await fs.outputFile(
      join(process.cwd(), '.rive', 'index.jsx'),
      `
${setupFiles.map((file) => `import '../${file}';`).join('\n')}
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
`,
    );
  };

  await updateIndexJs();

  if (watch) {
    const watcher = chokidar.watch('src/setupDocs.{js,jsx,ts,tsx}', {
      persistent: true,
      awaitWriteFinish: true,
    });

    watcher.on('unlink', () => updateIndexJs());
    watcher.on('add', () => updateIndexJs());
  }

  const updateAppJs = async () => {
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

  await updateAppJs();

  if (watch) {
    const watcher = chokidar.watch(include, {
      ignored: exclude,
      cwd: rootDir,
      persistent: true,
      awaitWriteFinish: true,
    });

    watcher.on('unlink', () => updateAppJs());
    watcher.on('add', () => updateAppJs());
  }
}
