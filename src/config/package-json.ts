const config = {
  main: 'dist/index.cjs.js',
  module: 'dist/index.esm.js',
  style: 'dist/index.css',
  types: 'dist/index.d.ts',
  files: ['dist', 'README.md'],
  scripts: {
    start: 'rive start',
    build: 'rive build',
    test: 'rive test',
    lint: 'rive lint',
    format: 'rive format',
  },
  devDependencies: {
    rive: 'latest',
  },
  eslintConfig: {
    extends: ['rive'],
  },
  eslintIgnore: ['node_modules', 'coverage', 'dist'],
  stylelint: {
    extends: ['stylelint-config-rive'],
    ignoreFiles: ['node_modules', 'coverage', 'dist'],
  },
};

export default config;
