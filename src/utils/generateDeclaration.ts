import glob from 'fast-glob';
import ts from 'typescript';
import { exclude, include, outDir } from '../config.js';
import { readTsconfig } from './readTsconfig.js';
/**
 * Generate TypeScript declaration
 * @see https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
 */
export function generateDeclaration(): void {
  console.log('generating d.ts');
  const tsconfig = readTsconfig();
  const compilerOptions = {
    ...tsconfig?.compilerOptions,
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
    outDir,
  };
  const fileNames = glob.sync(tsconfig.include || include, {
    ignore: tsconfig.exclude || exclude,
  });
  // Create a Program with an in-memory emit
  const host = ts.createCompilerHost(compilerOptions);

  // Prepare and emit the d.ts files
  const program = ts.createProgram(fileNames, compilerOptions, host);
  program.emit();
  console.log('done');
}
