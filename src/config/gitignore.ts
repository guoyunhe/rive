const list = [
  'build', // document build output
  'coverage', // unit test coverage output
  'dist', // library output
  'node_modules', // npm packages
  'package-lock.json', // lock file of npm
  'pnpm-lock.yaml', // lock file of pnpm
  'yarn.lock', // lock file of yarn
];

const gitignore = list.join('\n');

export default gitignore;
