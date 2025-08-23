const langRegex = /\.([a-z]{2})\.mdx?$/;

export function getLang(filepath: string) {
  const langMatch = filepath.match(langRegex);
  if (langMatch) {
    return langMatch[1];
  }
  return 'en';
}
