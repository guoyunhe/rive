import { writeFileSync } from 'fs';

const config = `node_modules
coverage
dist
`;

export function updateGitIgnore() {
  writeFileSync('.gitignore', config);
}
