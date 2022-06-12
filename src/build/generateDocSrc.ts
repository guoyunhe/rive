import fs from 'fs-extra';
import { join } from 'path';
import { docSrcDir } from '../config';

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="index.tsx"></script>
  </body>
</html>`;

const indexJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

export function generateDocSrc() {
  fs.outputFileSync(join(docSrcDir, 'index.html'), indexHtml);
  fs.outputFileSync(join(docSrcDir, 'index.jsx'), indexJsx);

  const appJsx = `import React from 'react';
export default function App() {

}
`;
  fs.outputFileSync(join(docSrcDir, 'App.jsx'), appJsx);
}
