import chokidar from 'chokidar';
import glob from 'fast-glob';
import fs from 'fs-extra';
import { join } from 'path';
import { Config } from '../types/Config.js';
import { outputFileMemo } from '../utils/outputFileMemo.js';

export async function setupDoc(config: Config, watch?: boolean) {
  const docUIPath =
    config.packageJson.name === 'react-doc-ui' ? '../src' : 'react-doc-ui';
  const rootDir = config.doc.rootDir || '.';
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
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${config.doc.title}</title>
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
