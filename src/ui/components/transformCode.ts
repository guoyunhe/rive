const importRegex = /import[\w_,{}$\s]+from\s['"]([.@\w/_-]+)['"];?/gm;

export function transformCode(code: string) {
  return code.replace(importRegex, '');
}
