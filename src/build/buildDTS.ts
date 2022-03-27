import {
  Extractor,
  ExtractorConfig,
  IExtractorConfigPrepareOptions,
} from '@microsoft/api-extractor';
import glob from 'fast-glob';
import { rmSync } from 'fs';
import { join } from 'path';
import type { CompilerOptions } from 'typescript';
import ts from 'typescript';
import { exclude, include, outDir } from '../config.js';
import { readTsconfig } from '../utils/readTsconfig.js';

/**
 * Build TypeScript declaration files and bundle them into one
 * @see https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
 * @see https://www.npmjs.com/package/rollup-plugin-dts
 */
export async function buildDTS() {
  // Create a temp directory for intermediate files
  const dtsTempDir = join(outDir, 'dts_temp');
  const dtsTempEntry = join(dtsTempDir, 'index.d.ts');

  const tsconfig = readTsconfig();
  const compilerOptionsResult = ts.convertCompilerOptionsFromJson(
    tsconfig,
    process.cwd()
  );
  const compilerOptions: CompilerOptions = {
    ...compilerOptionsResult.options,
    declaration: true,
    emitDeclarationOnly: true,
    outDir: dtsTempDir,
  };

  const fileNames = await glob(tsconfig.include || include, {
    ignore: tsconfig.exclude || exclude,
  });

  // Prepare and emit the d.ts files
  const program = ts.createProgram(fileNames, compilerOptions);
  program.emit();

  // Bundle d.ts files
  // TODO: use api-extractor instead
  const extractorOptions: IExtractorConfigPrepareOptions = {
    configObjectFullPath: join(process.cwd(), 'api-extractor.json'),
    packageJsonFullPath: join(process.cwd(), 'package.json'),
    configObject: {
      mainEntryPointFilePath: dtsTempEntry,
      projectFolder: process.cwd(),
      compiler: {
        tsconfigFilePath: join(process.cwd(), 'tsconfig.json'),
      },
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: join(outDir, 'index.d.ts'),
      },
    },
  };
  const extractorConfig = ExtractorConfig.prepare(extractorOptions);
  const extractorResult = Extractor.invoke(extractorConfig);
  if (extractorResult.succeeded) {
    rmSync(dtsTempDir, { recursive: true });
  } else {
    throw 'failed';
  }
}
