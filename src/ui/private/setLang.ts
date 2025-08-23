const langRegex = /^\/([a-z]{2}(-[A-Z]{2})?)\//;

export function setLang(path: string, lang: string) {
  let newPath = path;
  if (!newPath.endsWith('/')) {
    newPath += '/';
  }

  const langMatch = newPath.match(langRegex);
  if (langMatch) {
    if (lang === 'en') {
      return newPath.replace(langRegex, '/');
    } else {
      return newPath.replace(langRegex, `/${lang}/`);
    }
  } else if (lang === 'en') {
    return newPath;
  } else {
    return `/${lang}${newPath}`;
  }
}
