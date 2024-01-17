import chokidar from 'chokidar';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { join } from 'path';
import { getBasename } from '../config/getBasename.js';
import getPackageJson from '../config/getPackageJson.js';
import { outputFileMemo } from '../utils/outputFileMemo.js';

export async function setupDoc(watch?: boolean) {
  const packageJson = await getPackageJson();
  const docUIPath =
    packageJson.name === 'react-doc-ui' ? '../src' : 'react-doc-ui';
  const basename = await getBasename();

  await fs.mkdirp('.rive');

  await fs.outputFile(
    join(process.cwd(), '.rive', 'index.html'),
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${packageJson.name}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.jsx"></script>
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
    const files = await glob(['**/*.md', '**/*.mdx'], {
      ignore: ['node_modules'],
    });
    await outputFileMemo(
      join(process.cwd(), '.rive', 'App.jsx'),
      `
import React from 'react';
import DocUI from '${docUIPath}';
${files.map((file, index) => `import * as mdx${index} from '../${file}'`).join(';\n')}

export default function App() {
  return (
    <DocUI
      docs={[ ${files.map((_file, index) => `mdx${index}`).join(', ')} ]}
      basename="${basename}"
    />
  );
}
`,
    );
  };

  await update();

  if (watch) {
    const watcher = chokidar.watch(['**/*.md, **/*.mdx'], {
      ignored: ['**/node_modules/**'], // ignore dotfiles
      persistent: true,
    });

    watcher.on('change', () => update());
  }
}
