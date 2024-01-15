import fs from 'fs-extra';

const memo = new Map<string, string>();

export async function outputFileMemo(filePath: string, fileContent: string) {
  if (fileContent === memo.get(filePath)) {
    return;
  }
  await fs.outputFile(filePath, fileContent);
  memo.set(filePath, fileContent);
}
