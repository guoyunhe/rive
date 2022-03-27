const config = {
  compilerOptions: {
    allowSyntheticDefaultImports: true,
    jsx: 'react',
    lib: ['esnext', 'dom'],
    moduleResolution: 'node',
    strict: true,
    types: [],
  },
  include: ['src/**/*.ts', 'src/**/*.tsx'],
  exclude: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
};

export default config;