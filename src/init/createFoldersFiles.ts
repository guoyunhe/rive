import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { findEntry } from '../utils/findEntry.js';

const entryFileContent = `import React, { ReactNode } from 'react';

export interface MyComponentProps {
  children?: ReactNode;
}

export function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}
`;

export function createFoldersFiles() {
  if (!existsSync('src')) {
    mkdirSync('src');
  }
  if (!findEntry()) {
    writeFileSync('src/index.tsx', entryFileContent);
  }
}
