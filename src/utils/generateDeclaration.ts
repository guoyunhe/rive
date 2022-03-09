import glob from 'fast-glob';
import { rmSync } from 'fs';
import { join } from 'path';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';
import ts from 'typescript';
import { exclude, include, outDir } from '../config.js';
import { readTsconfig } from './readTsconfig.js';

/**
 * Generate TypeScript declaration files and bundle them into one
 * @see https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
 * @see https://www.npmjs.com/package/rollup-plugin-dts
 */
export async function generateDeclaration(): Promise<void> {
  const tsconfig = readTsconfig();
  const dtsOutDir = join(outDir, '_types');
  const compilerOptions = {
    ...tsconfig?.compilerOptions,
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
    outDir: dtsOutDir,
  };
  const fileNames = glob.sync(tsconfig.include || include, {
    ignore: tsconfig.exclude || exclude,
  });

  // Create a Program with an in-memory emit
  const host = ts.createCompilerHost(compilerOptions);

  // Prepare and emit the d.ts files
  const program = ts.createProgram(fileNames, compilerOptions, host);
  program.emit();

  // Bundle d.ts files
  const bundle = await rollup({
    input: join(process.cwd(), dtsOutDir, 'index.d.ts'),
    external: [/\.(css|sass|scss|less)$/u], // remove all non-js imports
    plugins: [dts()],
  });

  await bundle.write({ file: join(outDir, 'index.d.ts'), format: 'es' });

  rmSync(dtsOutDir, { recursive: true });
}
