import chalk from 'chalk';
import glob from 'fast-glob';
import { copyFile, mkdir, rm, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { replaceTscAliasPaths } from 'tsc-alias';
import ts from 'typescript';
import { Config } from '../types/Config';

export async function buildLib(config: Config) {
  const rootDir = process.cwd();
  const outDir = join(rootDir, 'dist');

  // convert string literal like 'esnext' to enum like ts.ModuleKind.ESNext (=99)
  const compilerOptionsResult = ts.convertCompilerOptionsFromJson(
    config.tsconfigJson.compilerOptions || {},
    rootDir,
    'tsconfig.json',
  );

  // quit building if compilerOptions is invalid
  if (compilerOptionsResult.errors.length > 0) {
    console.log(
      chalk.red('[rive]'),
      'Failed to parse compilerOptions from tsconfig.json:',
    );
    // margin bottom
    console.log();
    compilerOptionsResult.errors.forEach((error) => {
      console.log(error.code, error.messageText);
    });
    // margin bottom
    console.log();

    process.exit(1);
  }

  // find source files
  const exts = '{cjs,cts,js,jsx,mjs,mts,ts,tsx}';
  const sources = await glob('src/**/*.' + exts, {
    ignore: [
      '**/*.bench.' + exts,
      '**/*.spec.' + exts,
      '**/*.test.' + exts,
      '**/__mocks__/**',
    ],
  });

  // find assets files
  const assets = await glob('src/**/*.{css,less,scss,json}');

  // empty old output
  await rm(outDir, { recursive: true, force: true });

  // compile esm and d.ts
  await (async () => {
    const compilerOptions: ts.CompilerOptions = {
      ...compilerOptionsResult.options,
      declaration: true,
      noEmit: false,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      rootDir: 'src',
      outDir,
    };
    const program = ts.createProgram(sources, compilerOptions);
    const emitResult = program.emit();

    const allDiagnostics = ts
      .getPreEmitDiagnostics(program)
      .concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
      if (diagnostic.file) {
        const { line, character } = ts.getLineAndCharacterOfPosition(
          diagnostic.file,
          diagnostic.start!,
        );
        const message = ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          '\n',
        );
        console.log(
          `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`,
        );
      } else {
        console.log(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
        );
      }
    });

    // convert alias paths (like ~/types) to relative path (like ../../types)
    await replaceTscAliasPaths({
      configFile: join(rootDir, 'tsconfig.json'),
      declarationDir: outDir,
      outDir,
      resolveFullPaths: true,
    });

    // copy styles, images, etc.
    await Promise.all(
      assets.map(async (asset) => {
        const dest = join(outDir, asset.substring(3));
        try {
          await mkdir(dirname(dest), { recursive: true });
        } catch (e) {
          //
        }
        await copyFile(join(rootDir, asset), dest);
      }),
    );
  })();

  if (config.packageJson.type !== 'module') {
    // this is a trick to make Node recognize ESM with .js extension
    await writeFile(join(outDir, 'package.json'), '{"type":"module"}', 'utf-8');

    // compile cjs (optional)
    await (async () => {
      const compilerOptions: ts.CompilerOptions = {
        ...compilerOptionsResult.options,
        declaration: true,
        noEmit: false,
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.Node10,
        outDir: join(outDir, 'cjs'),
      };
      const program = ts.createProgram(sources, compilerOptions);
      program.emit();

      // copy styles, images, etc.
      await Promise.all(
        assets.map((asset) =>
          copyFile(
            join(rootDir, asset),
            join(outDir, 'cjs', asset.substring(3)),
          ),
        ),
      );

      // convert alias paths (like ~/types) to relative path (like ../../types)
      await replaceTscAliasPaths({
        configFile: join(rootDir, 'tsconfig.json'),
        declarationDir: join(outDir, 'cjs'),
        outDir: join(outDir, 'cjs'),
        resolveFullPaths: true,
      });
    })();
  }
}
