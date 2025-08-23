const langRegex = /\.([a-z]{2})\.mdx?$/;

export function getRoutePath(filepath: string) {
  let routePath = filepath.startsWith('/') ? filepath : `/${filepath}`;

  const langMatch = routePath.match(langRegex);
  if (langMatch) {
    routePath = `/${langMatch[1]}${routePath}`;
  }

  routePath = routePath.replace(/(\/README)?(\.[a-z]{2})?\.mdx?$/, '/').toLocaleLowerCase();

  return routePath;
}
