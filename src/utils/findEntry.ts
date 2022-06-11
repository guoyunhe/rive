import FastGlob from 'fast-glob';
import { outputFileSync } from 'fs-extra';
import { join } from 'path';

const entryFileContent = `import React, { ReactNode } from 'react';

export interface MyComponentProps {
  children?: ReactNode;
}

export function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}
`;

export function findEntry() {
  const entries = FastGlob.sync('src/index.{tsx,ts,jsx,js}');
  let entry = entries[0];
  if (!entry) {
    entry = join(process.cwd(), 'src', 'index.tsx');
    outputFileSync(entry, entryFileContent);
  }
  return entry;
}
