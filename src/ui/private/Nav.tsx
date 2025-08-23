import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import { DocLanguage, MDXDoc } from '../types';
import './Nav.css';
import { getLang } from './getLang';
import { getRoutePath } from './getRoutePath';
import { setLang } from './setLang';

export interface NavProps {
  docs: MDXDoc[];
  languages?: DocLanguage[];
  lang?: string;
}

export function Nav({ docs, languages }: NavProps) {
  const [location, navigate] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const newPath = setLang(location, i18n.language);
    if (newPath !== location) {
      navigate(newPath);
    }
  }, [i18n.language, location, navigate]);

  const docsFilteredByLang = docs
    .filter((doc) => getLang(doc.filepath) === i18n.language)
    .map((doc) => ({
      title: doc.title,
      path: getRoutePath(doc.filepath),
      group: doc.frontmatter?.group,
      order: doc.frontmatter?.order,
    }))
    .sort((a, b) => {
      if (typeof a.order === 'number' && typeof b.order === 'number') {
        return a.order - b.order;
      } else if (typeof a.order === 'number') {
        return -1;
      } else if (typeof b.order === 'number') {
        return 1;
      } else {
        return a.path.localeCompare(b.path);
      }
    });
  const groups: string[] = [];

  docsFilteredByLang.forEach((doc) => {
    if (doc.group && !groups.includes(doc.group)) {
      groups.push(doc.group);
    }
  });

  return (
    <aside className="rive-ui-nav">
      <nav className="rive-ui-nav-inner">
        <div className="rive-ui-site-settings">
          {languages && (
            <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {docsFilteredByLang
          .filter((doc) => !doc.group)
          .map((doc) => (
            <Link
              key={doc.path}
              className={(active) => (active ? 'rive-ui-nav-item active' : 'rive-ui-nav-item')}
              to={getRoutePath(doc.path)}
            >
              {doc.title}
            </Link>
          ))}

        {groups.map((group) => (
          <div key={group} className="rive-ui-nav-group">
            <div className="rive-ui-nav-group-title">{group}</div>
            {docsFilteredByLang
              .filter((doc) => group === doc.group)
              .map((doc) => (
                <Link
                  key={doc.path}
                  className={(active) => (active ? 'rive-ui-nav-item active' : 'rive-ui-nav-item')}
                  to={getRoutePath(doc.path)}
                >
                  {doc.title}
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
