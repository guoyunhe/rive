import chalk from 'chalk';
import glob from 'fast-glob';
import ignore from 'fast-ignore';
import { copyFile, rm } from 'fs/promises';
import { join } from 'path';
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
  let sources = await glob('src/**/*.{js,jsx,ts,tsx}');
  const ig = ignore([
    '*.spec.js',
    '*.spec.jsx',
    '*.spec.ts',
    '*.spec.tsx',
    ...(config.tsconfigJson.exclude || []),
  ]);
  sources = sources.filter((file) => !ig(file));

  // find assets files
  const assets = await glob('src/**/*.{css,less,scss}');

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
    });

    // copy styles, images, etc.
    await Promise.all(
      assets.map((asset) =>
        copyFile(join(rootDir, asset), join(outDir, asset.substring(3))),
      ),
    );
  })();

  // compile cjs (optional)
  if (config.packageJson.type !== 'module') {
    await (async () => {
      const compilerOptions: ts.CompilerOptions = {
        ...compilerOptionsResult.options,
        declaration: false,
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
    })();
  }
}
